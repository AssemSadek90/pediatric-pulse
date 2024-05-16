import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

String formatHour(String hour) {
  int h = int.parse(hour);
  String period = h >= 12 ? 'PM' : 'AM';
  h = h > 12 ? h - 12 : h;
  return '$h $period';
}

class AppointmentView extends StatefulWidget {
  final Map<String, dynamic> data;
  const AppointmentView({Key? key, required this.data}) : super(key: key);

  @override
  State<AppointmentView> createState() => _AppointmentViewState();
}

class _AppointmentViewState extends State<AppointmentView> {
  @override
  Widget build(BuildContext context) {
    var name = "${widget.data['parentFirstName']} ${widget.data['parentLastName']}";
    var from = formatHour(widget.data['From']); // Format 'From' time to AM/PM
    var to = formatHour(widget.data['To']); // Format 'To' time to AM/PM
    var date = '${widget.data['appointmentDate']} From: $from To: $to';

    return Container(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                if (widget.data['parentPic'] != null)
                  Container(
                    width: 64,
                    height: 64,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      image: DecorationImage(
                        image: NetworkImage(widget.data['parentPic']),
                        fit: BoxFit.cover,
                      ),
                    ),
                  )
                else
                  Container(
                    width: 64,
                    height: 64,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      image: DecorationImage(
                        image: AssetImage('assets/icon/profile.png'),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(8.0, 0, 0, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        widget.data['patientFirstName'],
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      Text(
                        ' ($name)',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                  Text(
                    date,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                    ),
                  ),
                ],
              ),
            ),
            const Divider(
              color: Color.fromARGB(255, 0, 0, 0),
              thickness: 10,
            ),
          ],
        ),
      ),
    );
  }
}
