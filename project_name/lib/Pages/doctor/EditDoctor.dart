import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class EditProfilePage extends StatefulWidget {
  @override
  _EditProfilePageState createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  bool contentVisibility = true;
  bool showActiveCommunities = true;
  final double coverHight = 200.0;
  final double profileHight = 104;
  bool isVisible = false;
  bool isActive = false;
  late var piclink;
  late TextEditingController _usernameController;
  late TextEditingController _passwordController;
  late TextEditingController _emailController;
  late TextEditingController _priceController;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        leading: IconButton(
          icon: Icon(Icons.arrow_back,
            color: Colors.white,
          ),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text(
          'Edit Profile',
          style: TextStyle(
            color: Colors.white,
            fontSize: 20.0,
            fontWeight: FontWeight.bold,)
          ),
        actions: <Widget>[
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              foregroundColor: Color.fromARGB(216, 255, 158, 47), backgroundColor: Color.fromARGB(255, 255, 181, 97),
            ),
            child: Text("Save", style: TextStyle(
              color: Colors.white,
            ),),
            onPressed: () {
              // Save button action
            },
          ),
        ],
      ),
      body: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          buildTop(),
          buildRest(),
        ],
      ),
    );
  }

  Widget buildRest() {
    return Container(
      padding: EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(height: 30.0),
          TextFormField(
            controller: _usernameController,
            decoration: InputDecoration(
              labelText: "UserName",
              hintText: 'Enter your username',
              hintStyle: TextStyle(color: Color(0xFF787878)),
              border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(20),
            ),
              filled: true, // Fill the background
              fillColor: Color.fromARGB(255, 250, 242, 242),
          ),
          ),
          SizedBox(height: 10.0),
          TextFormField(
            controller: _emailController,
            decoration: InputDecoration(
              labelText: "Email",
              hintText: 'Enter your email',
              hintStyle: TextStyle(color: Color(0xFF787878)),
              border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(20),
            ),
              filled: true, // Fill the background
              fillColor: Color.fromARGB(255, 250, 242, 242),
          ),
          ),
          SizedBox(height: 10.0),
          TextFormField(
            controller: _passwordController,
            decoration: InputDecoration(
              labelText: "Password",
              hintText: 'Enter your password',
              hintStyle: TextStyle(color: Color(0xFF787878)),
              border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(20),
            ),
              filled: true, // Fill the background
              fillColor: Color.fromARGB(255, 250, 242, 242),
          ),
          ),
          SizedBox(height: 10.0),
          TextFormField(
            controller: _priceController,
            decoration: InputDecoration(
              labelText: "Price",
              hintText: 'Enter your Price',
              hintStyle: TextStyle(color: Color(0xFF787878)),
              border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(20),
            ),
              filled: true, // Fill the background
              fillColor: Color.fromARGB(255, 250, 242, 242),
          ),
          ),
        ]
      ),
    );
  }

  Widget buildTop() {
    final top = coverHight - profileHight / 2;
    return Stack(
      clipBehavior: Clip.none,
      alignment: Alignment.center,
      children: [
        Container(
          margin: EdgeInsets.only(bottom: profileHight / 2),
          child: buildCoverImage(),
        ),
        Positioned(
          top: top,
          child: buildProfileImage(),
        ),
        Positioned(
          top: top + profileHight / 2 + 25.0,
          left: MediaQuery.of(context).size.width * 0.5 + 25.0,
          child: GestureDetector(
            onTap: () {
              // Handle changing profile photo
              pickImageFromPhone(ImageSource.gallery);
            },
            child: Container(
              width: 24.0,
              height: 24.0,
              decoration: BoxDecoration(
                color: Colors.purple,
                borderRadius: BorderRadius.circular(22.0),
              ),
              child: Center(
                child: Icon(
                  Icons.add,
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget buildCoverImage() => Container(
        color: Colors.grey,
        child: Image.asset(
          'assets/icon/0.png',
          fit: BoxFit.cover,
        ),
        width: double.infinity,
        height: coverHight,
      );

  Widget buildProfileImage() => CircleAvatar(
        radius: profileHight / 2,
        backgroundColor: Colors.black,
        backgroundImage: AssetImage('assets/icon/profile.png'),
      );

  void pickImageFromPhone(ImageSource source) async {
    final picker = ImagePicker();
    final pickedImage = await picker.pickImage(source: ImageSource.gallery);

    if (pickedImage != null) {
      var request = http.MultipartRequest('POST', Uri.parse('https://api.imgur.com/3/image'));
      request.files.add(await http.MultipartFile.fromPath('image', pickedImage.path));
      request.headers.addAll({
        'Authorization': 'Client-ID 61abcb0628de673'
      });

      var response = await request.send();
      var responseData = await response.stream.toBytes();
      var responseString = String.fromCharCodes(responseData);

      if (response.statusCode == 200) {
        var data = jsonDecode(responseString);
        piclink = data['data']['link'];
        print(piclink);
      } else {
        print('Failed to upload image: ${response.statusCode}');
        print('Error: $responseString');
      }
    }
  }
}
