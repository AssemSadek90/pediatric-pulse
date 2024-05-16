class routes {
  static const String baseUrl = 'https://pediatric-pulse.onrender.com';
  static const String login = '$baseUrl/login';
  static const String register = '$baseUrl/signup';
  static String getUser(int userId, String token) => '$baseUrl/get/user/$userId?token=$token';
  static String doctorAppointment(int doctorId, String token) => '$baseUrl/get/doctor/appointments/table/$doctorId/$doctorId?token=$token';
  static String doctorInfo(int doctorId, String token) => '$baseUrl/get/doctor/$doctorId?token=$token';
  static String deleteAppointment(int doctorId, String token, int appointmentId) => '$baseUrl/delete/appointment/$appointmentId/$doctorId?token=$token';
  static String updateDoctor(int doctorId, String token) => '$baseUrl/update/doctor/$doctorId?token=$token';
  static String updateUser(int userId, String token) => '$baseUrl/update/user/$userId?token=$token';

}