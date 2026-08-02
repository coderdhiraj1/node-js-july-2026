import express from "express";
import courses from "./data/courses.json" with { type: "json" };
import fs from "node:fs";

const FILE = "./data/courses.json";
const app = express();
const PORT = 3000;

app.use(express.json());

// inform browser
app.get("/", (req, res) => {
  res.send("Welcome to Courses managment system!");
})


/**
 * 
 * /GET /courses
 * All Courses
 * 
 */
app.get("/courses", (req, res) => {
  if(courses.length === 0){
    return res.status(400).json({'success': false, 'message': 'No courses found.', 'data': []});
  }
  return res.status(200).json({'success': true, 'message': `${courses.length} Courses found successfully.` , 'data': courses});
})


/**
 * 
 * /GET /course/:id
 * Find course by id
 * 
 */
app.get("/course/:id", (req, res) => {
  const { id } = req.params;
  let course = null;
  if(id){
    course = courses.find((course) => course.id === Number(id));
  }

  if(!course){
    return res.status(400).json({'success': false, 'message': 'No course found with this id.', 'data': []});
  }
  return res.status(200).json({'success': true, 'message': `Course found successfully.` , 'data': course});
})


/**
 * 
 * /POST /course
 * Create new course
 * 
 */
app.post("/course", (req, res) => {

  const {name, price, duration, creator} = req.body;
  
  if(!name || !price || !duration || !creator){
    return res.status(400).json({'success': false, 'message': 'Please provide all required fields (name, price, duration, creator).', 'data': []});
  }

  // check name already exists
  const courseExists = courses.find((course) => course.name.toLowerCase() === name.toLowerCase());
  if(courseExists){
    return res.status(400).json({'success': false, 'message': 'Course with this name already exists.', 'data': []});
  }

  const course = {
    "id": courses.length + 1,
    "name": name,
    "price": price,
    "duration": duration,
    "creator": creator
  }

  /**
   * 1. target file
   * 2. data to write
   * 3. encoding
   * 4. callback (async operation must use callback - async await also one solution)
   * 
   * stringify - convert object to string
   * 1. data to convert
   * 2. replacer - null means no replacer
   * 3. space - 4 means 4 spaces for indentation
   */
  fs.writeFile(
    FILE,
    JSON.stringify([...courses, course], null, 4),
    'utf-8',
    (err) => {
      if(err){
        return res.status(500).json({'success': false, 'message': 'Error while saving course.', 'data': []});
      }
      return res.status(200).json({'success': true, 'message': 'Course added successfully.', 'data': course});
    }
  )


});


/**
 * 
 * /PUT /course
 * Update course
 * 
 */
app.put("/course/:id", (req, res) => {

  const {name, price, duration, creator} = req.body;
  
  const { id } = req.params;

  // course validation
  const course = courses.find((course) => course.id === Number(id));
  if(!course){
    return res.status(400).json({'success': false, 'message': 'No course found with this id.', 'data': []});
  }

  // duplicate name check
  if(name){
    const courseExists = courses.find((course) => course.name.toLowerCase() === name.toLowerCase());
    if(courseExists && courseExists.id !== Number(id)){
      return res.status(400).json({'success': false, 'message': 'Course with this name already exists.', 'data': []});
    }
  }

  // data buildup for update
  const updates = {};

  if (name !== undefined) updates.name = name;
  if (price !== undefined) updates.price = price;
  if (duration !== undefined) updates.duration = duration;
  if (creator !== undefined) updates.creator = creator;

  // updating the json object 
  courses.forEach((course, index) => {
    if(course.id === Number(id)){
      courses[index] = {...course, ...updates};
    }
  });

  // write file for permanent update
  fs.writeFile(FILE, JSON.stringify(courses, null, 4), 'utf-8', (err) => {
    if(err){
      return res.status(500).json({'success': false, 'message': 'Error while updating course.', 'data': []});
    }

    const newData = courses.find((course) => course.id === Number(id));

    return res.status(200).json({'success': true, 'message': 'Course updated successfully.', 'data': newData})
  });
})



/**
 * 
 * /DELETE /course/delete/:id
 * Delete course
 * 
 */
app.delete('/course/delete/:id', (req, res) => {
  const { id } = req.params;

  // course validation
  const course = courses.find((course) => course.id === Number(id));
  if(!course){
    return res.status(400).json({'success': false, 'message': 'No course found with this id.', 'data': []});
  }

  // delete course from array
  const newCourses = courses.filter((course) => course.id !== Number(id));
  
  // write file for permanent delete
  fs.writeFile(FILE, JSON.stringify(newCourses, null, 4), 'utf-8', (err) => {
    if(err){
      return res.status(500).json({'success': false, 'message': 'Error while deleting course.', 'data': []});
    }
    return res.status(200).json({'success': true, 'message': 'Course deleted successfully.', 'data': []});
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);  
});