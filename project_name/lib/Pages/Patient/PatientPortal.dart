import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:project_name/Pages/auth/StartingScreen.dart';
import 'package:project_name/Pages/features/NaveBar.dart';
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
        title: const Text('Patient Portal'),
        automaticallyImplyLeading: false,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: () {
                getUserData();
              },
              child: const Text('Get User Data'),
            ),
            ElevatedButton(
              onPressed: () {
                Get.to(StartingScreen());
              },
              child: const Text('Logout'),
            ),
          ],
        ),
      ),
    bottomNavigationBar: NavBar()
    );
  }
}