import requests
import sys
import json
from datetime import datetime
import time

class IPLabsAPITester:
    def __init__(self, base_url="https://ip-labs-portal.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })

    def test_application_submit(self):
        """Test application submission endpoint"""
        url = f"{self.base_url}/api/applications/submit"
        
        # Test data
        test_application = {
            "fullName": f"Test Student {datetime.now().strftime('%H%M%S')}",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "1234567890",
            "collegeName": "Test University",
            "course": "B.Tech Computer Science",
            "year": "3rd Year",
            "areaOfInterest": "AI & Machine Learning",
            "motivation": "I am passionate about AI and want to contribute to patent research in this field. This internship will help me gain practical experience."
        }

        try:
            response = requests.post(url, json=test_application, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("applicationId"):
                    self.log_test("Application Submit", True, f"Application ID: {data.get('applicationId')}")
                    return data.get("applicationId")
                else:
                    self.log_test("Application Submit", False, f"Invalid response format: {data}")
                    return None
            else:
                self.log_test("Application Submit", False, f"Status {response.status_code}: {response.text}")
                return None

        except Exception as e:
            self.log_test("Application Submit", False, f"Request failed: {str(e)}")
            return None

    def test_application_submit_validation(self):
        """Test application submission with invalid data"""
        url = f"{self.base_url}/api/applications/submit"
        
        # Test with missing required fields
        invalid_data = {
            "fullName": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "phone": "123",  # Invalid phone
        }

        try:
            response = requests.post(url, json=invalid_data, timeout=30)
            
            # Should return 422 for validation errors
            if response.status_code == 422:
                self.log_test("Application Validation", True, "Correctly rejected invalid data")
            else:
                self.log_test("Application Validation", False, f"Expected 422, got {response.status_code}")

        except Exception as e:
            self.log_test("Application Validation", False, f"Request failed: {str(e)}")

    def test_applications_list(self):
        """Test applications list endpoint"""
        url = f"{self.base_url}/api/applications/list"
        
        try:
            response = requests.get(url, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "applications" in data and "total" in data:
                    self.log_test("Applications List", True, f"Found {data.get('total')} applications")
                    return True
                else:
                    self.log_test("Applications List", False, f"Invalid response format: {data}")
                    return False
            else:
                self.log_test("Applications List", False, f"Status {response.status_code}: {response.text}")
                return False

        except Exception as e:
            self.log_test("Applications List", False, f"Request failed: {str(e)}")
            return False

    def test_applications_stats(self):
        """Test applications statistics endpoint"""
        url = f"{self.base_url}/api/applications/stats"
        
        try:
            response = requests.get(url, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "totalApplications" in data:
                    self.log_test("Applications Stats", True, f"Total applications: {data.get('totalApplications')}")
                    return True
                else:
                    self.log_test("Applications Stats", False, f"Invalid response format: {data}")
                    return False
            else:
                self.log_test("Applications Stats", False, f"Status {response.status_code}: {response.text}")
                return False

        except Exception as e:
            self.log_test("Applications Stats", False, f"Request failed: {str(e)}")
            return False

    def test_api_health(self):
        """Test if API is accessible"""
        try:
            # Try to access the base API path
            response = requests.get(f"{self.base_url}/api/applications/stats", timeout=10)
            
            if response.status_code in [200, 404, 422]:  # Any response means API is up
                self.log_test("API Health", True, f"API is accessible (status: {response.status_code})")
                return True
            else:
                self.log_test("API Health", False, f"Unexpected status: {response.status_code}")
                return False

        except Exception as e:
            self.log_test("API Health", False, f"API not accessible: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting IP Labs Backend API Tests")
        print(f"🔗 Testing API at: {self.base_url}")
        print("=" * 60)

        # Test API health first
        if not self.test_api_health():
            print("❌ API is not accessible. Stopping tests.")
            return False

        # Test all endpoints
        self.test_application_submit()
        self.test_application_submit_validation()
        self.test_applications_list()
        self.test_applications_stats()

        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return False

def main():
    tester = IPLabsAPITester()
    success = tester.run_all_tests()
    
    # Save test results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "total_tests": tester.tests_run,
            "passed_tests": tester.tests_passed,
            "success_rate": f"{(tester.tests_passed/tester.tests_run)*100:.1f}%" if tester.tests_run > 0 else "0%",
            "results": tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())