import mongoose from 'mongoose';
import db from './server';
import Project from './projectModel';

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false

    try {
        const data = JSON.parse(event.body),
            name = data.name,
            city = data.city,
            state = data.state,
            details = data.details,
            status = parseInt(data.status),
            budget = parseInt(data.budget),
            id = mongoose.Types.ObjectId(),
            project = {
                _id: id,
                name: name,
                city: city,
                state: state,
                details: details,
                status: status,
                budget: budget,
                __v: 0
            },
        response = {
            msg: "Project successfully created",
            data: project,
        }

        await Project.create(project);
        return {
            statusCode: 201,
            body: JSON.stringify(response)
        }
    } catch (err) {
        console.log('project.create', err)
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message })
        }
    }
}