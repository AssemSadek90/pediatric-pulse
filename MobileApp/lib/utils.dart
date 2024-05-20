import 'package:shared_preferences/shared_preferences.dart';

Future<void> saveStringData(String Name, String Data) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  await prefs.setString(Name, Data);
}


Future<void> saveIntData(String Name, int Data) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  await prefs.setInt(Name, Data);
}