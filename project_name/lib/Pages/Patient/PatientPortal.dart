import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:project_name/routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PatientPortal extends StatefulWidget {
  final String? token;
  final int? userId;
  const PatientPortal({super.key, required this.token, required this.userId});

  @override
  State<PatientPortal> createState() => _PatientPortalState();
}

class _PatientPortalState extends State<PatientPortal> {


  Future<void> getUserData() async {
    final url = Uri.parse(routes.getUser(widget.userId!, widget.token!));
    final headers = {
      'accept': 'application/json',
    };

    try {
      final response = await http.get(url, headers: headers);

      if (response.statusCode == 200) {
        // If the server returns a 200 OK response, parse the JSON.
        Map<String, dynamic> data = jsonDecode(response.body);
        print(data);
      } else {
        // If the server did not return a 200 OK response, throw an exception.
        print('Request failed with status: ${response.statusCode}.');
      }
    } catch (e) {
      // Catch any exceptions thrown during the request and print them.
      print('Exception occurred: $e');
    }
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text(
          'Patient Portal',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 32.0)
        ),
        centerTitle: true,
        actions: [
          ElevatedButton(onPressed: () async { 
            SharedPreferences prefs = await SharedPreferences.getInstance();
              await prefs.remove('accessToken');
              await prefs.remove('role');
              await prefs.remove('userId');
           }, 
          child: Text('LogOut'),)
        ],
      ),
    );
  }
}