
class routes {
  static const String baseUrl = 'https://pediatric-pulse.onrender.com';
  static const String login = '$baseUrl/login';
  static const String register = '$baseUrl/signup';
  static String getUser(int userId, String token) => '$baseUrl/get/user/$userId?token=$token';
  static String doctorAppointment(int doctorId, String token) => '$baseUrl/get/doctor/appointments/table/$doctorId/$doctorId?token=$token';
  static String doctorInfo(int doctorId, String token) => '$baseUrl/get/doctor/$doctorId?token=$token';
  static String updateDoctor(int doctorId, String token) => '$baseUrl/update/doctor/$doctorId?token=$token';
  static String updateUser(int userId, String token) => '$baseUrl/update/user/$userId?token=$token';
  static String getPaitenAppointment(int pid, String token) => '$baseUrl/get/appointment/$pid?token=$token';
  static String deleteAppointment(int appointmentId, int adminId, String token) => '$baseUrl/delete/appointment/$appointmentId/$adminId?token=$token';
  static String yourPatients(int parentId, String token) => '$baseUrl/get/patients/$parentId?token=$token';
  static String updatePatient(int patientId, int parentId, String token) => '$baseUrl/update/patient/$patientId/$parentId?token=$token';
  static String addPatient(String token) => '$baseUrl/add/patient?token=$token';
}



