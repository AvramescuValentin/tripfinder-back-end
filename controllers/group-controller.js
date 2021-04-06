const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');
const Group = require('../models/group')


const getGroupById = async (req, res, next) => {
    const groupId = req.params.pid;
    let group;
    try {
        group = await Group.findById(groupId);
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not find place', 500);
        return next(error);
    }
    ;


    if (!group) {
        return next(new HttpError('Could not find a group with this id', 404));
    }

    res.status(201).json({group: group.toObject({getters: true})});
};

const getGroupsByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let group;
    try {
        group = await Group.find({creator: userId});
        console.log(group);
    } catch (err) {
        const error = new HttpError('Fetching groups failed. Please try again later.', 500);
        return next(error);
    }
    ;

    if (group.length === 0 || !group) {
        return next(new HttpError('Could not find a group with provided user id', 404));
    }

    res.status(201).json({group: group.map(group => group.toObject({getters: true}))});
};

const createGroup = async (req, res, next) => {
    console.log('Creating new group!');
    const errors = validationResult(req); // valideaza componentele din req inainte de a trece mai departe si returneaza erori
    if (!errors.isEmpty()) { // daca nu e gol, i.e. exista erori, vom da throw la o eroare http
        console.log(errors);
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const {title, description, image, location, tags, creator} = req.body;
    const createdGroup = new Group({
        title,
        description,
        image: 'https://static.rentcars.com/imagens/modules/localidade/about/983-desktop-location-description.png',
        location,
        tags,
        creator
    });

    try {
        await createdGroup.save();
    } catch (err) {
        const error = new HttpError('Creating a new group failed. Please try again', 500);
        return next(error); // o folosim ca sa oprim executia in caz ca intervine o eroare
        //altfel executia va continua chiar daca primim o eroare.
    }
    ;


    res.status(201).json({group: createdGroup});

    console.log('New group created!');
};

const updateGroup = async (req, res, next) => {
    const {title, description} = req.body;
    const groupId = req.params.pid;
    let group;
    try {
        group = await Group.findById(groupId);
    } catch (err) {
        const error = HttpError('Something went wrong. Please try again later', 500);
        return next(error);
    }

    group.title = title;
    group.description = description;

    try {
        await group.save();
    } catch (err) {
        const error = new HttpError('Something went wrong. Please try again later', 500);
        return next(error);
    }

    res.status(200).json({group: group.toObject({getters: true})});
};

const deleteGroup = async (req, res, next) => {
    console.log("Sterge");
    const groupId = req.params.pid;
    console.log(groupId);
    let group;
    try{
        group = await Group.findById(groupId);
        await group.remove();
    }catch (err){
        const error = new HttpError('Something went wrong. Please try again later', 500);
        return next(error);
    }

    res.status(200).json({message: "data deleted!"});
};

exports.getGroupById = getGroupById;
exports.getGroupsByUserId = getGroupsByUserId;
exports.createGroup = createGroup;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;
