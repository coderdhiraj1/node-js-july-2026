import { readFile, writeFile } from "../helpers/file.helper.js";

const FILE = "./data/courses.json";

export async function all(){
    const courses = await readFile(FILE);
    return courses;
}

export async function getById(req){
    const { id } = req.params;
    let course = false;
    const courses = await readFile(FILE);
    if(id){
        if(courses.length!=0){
            course = courses.find((course) => course.id === Number(id));
        }
    }
    return course;   
}

export async function createNew(body){
    const {name, price, duration, creator} = body;

    const courses = await readFile(FILE);
    // check name already exists
    const courseExists = courses.find((course) => course.name.toLowerCase() === name.toLowerCase());
    if(courseExists){
        return {'res': false, 'msg': 'Same course already exist!'};
    }

    const course = {
        "id": courses.length + 1,
        "name": name,
        "price": price,
        "duration": duration,
        "creator": creator
    }
    
    await writeFile(FILE, [...courses, course]);

    return {'res': true, 'data': course};
}


export async function updateCourse(id, body) {
    const { name, price, duration, creator } = body;

    const courseId = Number(id);

    const courses = await readFile(FILE);

    // Find course
    const course = courses.find(course => course.id === courseId);

    if (!course) {
        return {
            res: false,
            msg: 'No course found with this id.'
        };
    }

    // Duplicate name check
    if (name !== undefined) {
        const courseExists = courses.find(
            course =>
                course.name.toLowerCase() === name.toLowerCase() &&
                course.id !== courseId
        );

        if (courseExists) {
            return {
                res: false,
                msg: 'Course with this name already exists.'
            };
        }
    }

    // Build updates
    const updates = {};

    if (name !== undefined) updates.name = name;
    if (price !== undefined) updates.price = price;
    if (duration !== undefined) updates.duration = duration;
    if (creator !== undefined) updates.creator = creator;

    // Update course
    const index = courses.findIndex(course => course.id === courseId);

    courses[index] = {
        ...courses[index],
        ...updates
    };

    // Save to file
    await writeFile(FILE,courses);

    return {
        res: true,
        data: courses[index]
    };
}

export async function deleteCourse(id) {
    const courseId = Number(id);

    const courses = await readFile(FILE);

    // Check course exists
    const course = courses.find(course => course.id === courseId);

    if (!course) {
        return {
            res: false,
            msg: 'No course found with this id.'
        };
    }

    // Remove course
    const newCourses = courses.filter(
        course => course.id !== courseId
    );

    // Save updated courses
    await writeFile(FILE,newCourses);

    return {
        res: true
    };
}