import mongoose from 'mongoose';
import db from './server';
import Project from './projectModel';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
    const projects = await Project.find().skip(16),
          response = {
            msg: "Projects successfully found",
            data: projects
          }
    
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
    
  } catch (err) {
    console.log('product.readOthers',err) 
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}