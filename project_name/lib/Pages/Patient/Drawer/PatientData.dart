import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:project_name/Pages/Patient/Drawer/EditPatient.dart';
import 'package:project_name/Pages/Patient/Drawer/EditPatient.dart';


class PatientView extends StatefulWidget {
  final Map<String, dynamic> data;
  final String? token;
  const PatientView({super.key, required this.data, required this.token});

  @override
  State<PatientView> createState() => _PatientViewState();
}

class _PatientViewState extends State<PatientView> {
  late var data = widget.data;


  @override
  void initState() {
    super.initState();
  
  }


  @override
  Widget build(BuildContext context) {
    print("Data is 2222: ${widget.data}");
    String capitalize(String text) {
    return text.split(" ").map((str) => str[0].toUpperCase() + str.substring(1)).join(" ");}
    return Container(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                SizedBox(
                  height: 10,
                ),
                Text(
                  capitalize(data['firstName']) + ' ' + capitalize(data['lastName']),
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white
                  ),
                ),
                SizedBox(
                  height: 10,
                ),
                Spacer(),
                IconButton(
                  icon: Image(
                    image: AssetImage('assets/icon/image.png'),
                    width: 24,
                    height: 24,
                  ),
                  onPressed: () async {
                    Get.to(() => EditPatient(
                      parentId: data['parentId'],
                      patientId: data['id'],
                      token: widget.token,
                      firstName: data['firstName'],
                      lastName: data['lastName'],
                      gender: data['gender'],
                      age: data['age'],
                    ));
                  },
                ),
                
              ],
            ),
          ),
          Divider(
            color: Color.fromARGB(255, 46, 46, 46),
            thickness: 1,
          )
        ],
      ),
    );
  }
}