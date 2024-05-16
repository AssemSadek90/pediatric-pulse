class routes {
  static const String baseUrl = 'https://pediatric-pulse.onrender.com';
  static const String login = '$baseUrl/login';
  static const String register = '$baseUrl/signup';
  static String getUser(int userId, String token) => '$baseUrl/get/user/$userId?token=$token';
  static String doctorAppointment(int doctorId, String token) => '$baseUrl/get/doctor/appointments/table/$doctorId/$doctorId?token=$token';

}