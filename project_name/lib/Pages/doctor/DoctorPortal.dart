import 'package:flutter/material.dart';

class AdminPanal extends StatefulWidget {
  const AdminPanal({super.key});

  @override
  State<AdminPanal> createState() => _AdminPanalState();
}

class _AdminPanalState extends State<AdminPanal> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text(
          'Doctor Portal',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 32.0)
        ),
        centerTitle: true,
      ),
    );
  }
}