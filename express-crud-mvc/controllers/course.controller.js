import { all, getById, createNew, updateCourse, deleteCourse } from '../services/course.service.js';

export async function index(req, res){
    const courses = await all();
    if(courses.length){
        return res.status(200).json({'success': true, 'message': "Courses found successfully.", 'data': courses});
    }
    return res.status(400).json({'success': false, 'message': "Courses not found", 'data': []});
}

export function getCourseById(req, res){
    const course = getById(req);
    if(course){
        return res.status(200).json({'success': true, 'message': `Course found successfully.` , 'data': course});
    }
    return res.status(400).json({'success': false, 'message': 'No course found with this id.', 'data': []});
}

export async function create(req, res){
    const {name, price, duration, creator} = req.body;

    if(!name || !price || !duration || !creator){
    return res.status(400).json({'success': false, 'message': 'Please provide all required fields (name, price, duration, creator).', 'data': []});
    }

    const status = await createNew(req.body);


    if(status.res){
        return res.status(200).json({'success': true, 'message': 'Course added successfully.', 'data': status.data});
    }
    else{
        return res.status(500).json({'success': false, 'message': status.msg, 'data': []});
    }
        
}

export async function update(req, res) {
    const { id } = req.params;

    const status = await updateCourse(id, req.body);

    if (!status.res) {
        return res.status(400).json({
            success: false,
            message: status.msg,
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: 'Course updated successfully.',
        data: status.data
    });
}

export async function destroy(req, res) {
    const { id } = req.params;

    const status = await deleteCourse(id);

    if (!status.res) {
        return res.status(400).json({
            success: false,
            message: status.msg,
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: 'Course deleted successfully.',
        data: []
    });
}