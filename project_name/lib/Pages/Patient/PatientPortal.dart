import 'package:flutter/material.dart';

class PatientPortal extends StatefulWidget {
  const PatientPortal({super.key});

  @override
  State<PatientPortal> createState() => _PatientPortalState();
}

class _PatientPortalState extends State<PatientPortal> {
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
      ),
    );
  }
}