import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:project_name/Pages/Patient/PatientPortal.dart';
import 'package:project_name/Pages/doctor/DoctorPortal.dart';
import 'package:project_name/Pages/auth/StartingScreen.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// A StatefulWidget that determines the authentication state and navigates accordingly.
class AuthContainer extends StatefulWidget {
  /// Constructor for the AuthContainer widget.
  const AuthContainer({
    super.key,
  });

  @override
  State<AuthContainer> createState() => _AuthContainerState();
}

/// The state for the AuthContainer widget.
class _AuthContainerState extends State<AuthContainer> {
  String? access_token; // Variable to store the access token
  String? role;

  @override
  void initState() {
    super.initState();
    // Retrieve token from shared preferences when the widget initializes
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        access_token = sharedPrefValue.getString('token');
        role = sharedPrefValue.getString('role');
        print(access_token);
      });
    });
  }


  @override
  Widget build(BuildContext context) {
    if (access_token == null) {
      return const StartingScreen();
    } else {
      if(role == 'customer'){
        return const PatientPortal();
      }
      else if(role == 'doctor'){
        return const AdminPanal();
      }
      else{
        return const StartingScreen();
      }
    }
  }
}


