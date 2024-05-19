import 'package:flutter/material.dart';
import 'package:project_name/Pages/Patient/PatientPortal.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:project_name/routes.dart';

class AddAppointment extends StatefulWidget {
  final String? token;
  final int? parentId;
  const AddAppointment({super.key, required this.token, required this.parentId});

  @override
  State<AddAppointment> createState() => _AddAppointmentState();
}

class _AddAppointmentState extends State<AddAppointment> {
  late List<dynamic> patientList = [];
  late List<dynamic> doctorList = [];
  late List<dynamic> appointmentList = [];
  int? selectedPatientId;
  int? selectedDoctorId;
  String? selectedPatientName;
  String? selectedDoctorName;
  late String? appointmentDate = '';
  late int? from = 0;
  late int? to = from! + 1;
  late String FromAm = 'AM';
  late String ToAm = 'AM';
  late bool isSelected = false;

  final List<String> weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  final List<String> timeSlots = [
    '9', '10', '11', '12', '13', '14', '15', '16', '17'
  ];

  @override
  void initState() {
    super.initState();
    getPatient();
    _doctorList();
    getAllAppointments();
    
  }

  Future<void> getPatient() async {
    final url = Uri.parse(routes.yourPatients(widget.parentId!, widget.token!));
    final response = await http.get(url);

    print("get Patient response status: " + response.statusCode.toString());
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        patientList = data;
      });
    } else {
      print("get Patient response status: " + response.statusCode.toString());
    }
  }

  Future<void> getAllAppointments() async {
    final url = Uri.parse(routes.getAllAppointments(widget.parentId!, widget.token!));
    final response = await http.get(url);

    print("get All Appointments response status: " + response.statusCode.toString());
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        appointmentList = data;
      });
    } else {
      print("get All Appointments response status: " + response.statusCode.toString());
    }
  }

  Future<void> _doctorList() async {
    final url = Uri.parse(routes.doctorList);
    final response = await http.get(url);

    print("get Doctor response status: " + response.statusCode.toString());
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        doctorList = data;
      });
    } else {
      print("get Doctor response status: " + response.statusCode.toString());
    }
  }


  Future<void> addAppointment() async{
    final url = Uri.parse(routes.addAppointments(widget.token!));
    final headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    };
    print('add appointments data: ${widget.parentId} $selectedDoctorId $selectedPatientId $appointmentDate $from ${from!+1}');
    final body = jsonEncode({
      'parentId': widget.parentId!,
      'doctorId': selectedDoctorId!,
      "patientId":selectedPatientId!,
      "appointmentDate":appointmentDate!,
      "From":"$from",
      "To": "${from! +1}",
      "isTaken": true
    });

   await http.post(url, headers: headers, body: body);

  }

  void _showSelectionBottomSheet(
      BuildContext context, List<dynamic> items, Function(int, String) onSelected, String title) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Container(
          height: 400,
          color: Colors.grey[200], // Change the background color here
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text(title, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              ),
              Expanded(
                child: ListView.builder(
                  itemCount: items.length,
                  itemBuilder: (BuildContext context, int index) {
                    final item = items[index];
                    final fullName = title == "Choose Patient"
                        ? '${item['firstName']} ${item['lastName']}'
                        : '${item['title']}';
                    return ListTile(
                      leading: title == "Choose Doctor"
                          ? CircleAvatar(
                              radius: 16,
                              backgroundImage: NetworkImage(item['thumbnail']),
                              backgroundColor: Colors.transparent,
                            )
                          : null,
                      title: Text(fullName, style: TextStyle(color: Colors.black)), // Change text color here
                      tileColor: Colors.white, // Change tile background color here
                      selectedTileColor: Colors.blue[100], // Change selected tile color here
                      onTap: () {
                        onSelected(item['id'], fullName);
                        Navigator.pop(context);
                      },
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }
  bool isSlotTaken(String day, String time) {
    if (selectedDoctorId == null) return false;

    for (var appointment in appointmentList) {
      if (appointment['doctorId'] == selectedDoctorId &&
          appointment['appointmentDate'] == day &&
          '${appointment['From']}'== time.toString() &&
          appointment['isTaken'] == true) {
        return true;
      }
    }
    return false;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back,
            color: Colors.white,
          ),
          onPressed: () {
            Navigator.pop(context);
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => PatientPortal(
                  token: widget.token,
                  userId: widget.parentId,
                ),
              ),
            );
          },
        ),
        title: const Text(
          'Add Appointment',
          style: TextStyle(
            color: Colors.white,
            fontSize: 20.0,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
        actions: <Widget>[
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              foregroundColor: Color.fromARGB(216, 255, 158, 47), backgroundColor: Color.fromARGB(255, 255, 181, 97),
            ),
            child: Text("Save", style: TextStyle(
              color: Colors.white,
            ),),
            onPressed: () async{
              // Save button action
              await addAppointment();
              Navigator.pop(context);
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) =>  PatientPortal(
              token: widget.token,
              userId: widget.parentId,
            )));

            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          shrinkWrap: true,
          children: [
            Column(
              children: [
                SizedBox(height: 10,),
                Center(
                  child: Text('You want to add Appointment to your child: ${selectedPatientName??"(not selcted yet)"} with ${selectedDoctorName??"(not selcted yet)"} at ${appointmentDate??"(not selcted yet)"} from ${from??"(not selcted yet)"} to ${from !+ 1??"(not selcted yet)"}')
                ),
                SizedBox(height: 10,),
                Center(
                  child: Text(
                    'Choose Patient:',
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 22,
                    ),
                  ),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color.fromARGB(216, 255, 158, 47), // Background color
                    foregroundColor: Colors.white, // Text color
                    padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  onPressed: () => _showSelectionBottomSheet(
                    context,
                    patientList,
                    (id, name) => setState(() {
                      selectedPatientId = id;
                      selectedPatientName = name;
                    }),
                    'Choose Patient',
                  ),
                  child: Text(
                    selectedPatientName != null
                        ? selectedPatientName!
                        : 'Select Patient',
                    style: TextStyle(fontSize: 16),
                  ),
                ),
              ],
            ),
            Divider(
              color: Color.fromARGB(255, 211, 210, 210),
              thickness: 2,
            ),
            Column(
              children: [
                SizedBox(height: 10),
                Center(
                  child: Text(
                    'Choose Doctor:',
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 22,
                    ),
                  ),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color.fromARGB(216, 255, 158, 47), // Background color
                    foregroundColor: Colors.white, // Text color
                    padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  onPressed: () => _showSelectionBottomSheet(
                    context,
                    doctorList,
                    (id, name) => setState(() {
                      selectedDoctorId = id;
                      selectedDoctorName = name;
                    }),
                    'Choose Doctor',
                  ),
                  child: Text(
                    selectedDoctorName != null
                        ? selectedDoctorName!
                        : 'Select Doctor',
                    style: TextStyle(fontSize: 16),
                  ),
                ),
              ],
            ),
            Divider(
              color: Color.fromARGB(255, 211, 210, 210),
              thickness: 2,
            ),
            Column(
              children: [
                SizedBox(height: 10),
                Center(
                  child: Text(
                    'Choose Appointment Slot:',
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 22,
                    ),
                  ),
                ),
                SizedBox(height: 10),
                Table(
                  border: TableBorder.all(color: Colors.black),
                  children: [
                    TableRow(
                      children: [
                        TableCell(child: Center(child: Text('Time'))),
                        ...weekDays.map((day) => TableCell(child: Center(child: Text(day)))).toList(),
                      ],
                    ),
                    ...timeSlots.map((time) {
                      return TableRow(
                        children: [
                          TableCell(child: Center(child: Text(time))),
                          ...weekDays.map((day) {
                            bool taken = isSlotTaken(day, time);
                            return TableCell(
                              child: Center(
                                child: taken
                                    ? Text(
                                        'Taken',
                                        style: TextStyle(color: Colors.red, fontSize: 12),
                                      )
                                    : Container(
                                      color: Color.fromARGB(216, 255, 158, 47),
                                      child: ElevatedButton(
                                          style: ElevatedButton.styleFrom(
                                            backgroundColor: Color.fromARGB(216, 255, 158, 47),
                                            foregroundColor: Colors.white,
                                            padding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                                            shape: RoundedRectangleBorder(
                                              borderRadius: BorderRadius.circular(6),
                                            ),
                                          ),
                                          onPressed: () {
                                            setState(() {
                                              appointmentDate = day;
                                              from = int.parse(time);
                                            });
                                          },
                                          child: Text(
                                            '',
                                          ),
                                        ),
                                    ),
                              ),
                            );
                          }).toList(),
                        ],
                      );
                    }).toList(),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
