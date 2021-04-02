const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');


let DUMMY_GROUPS = [
    {
        id: 'g1',
        title: 'praga',
        description: 'cold beer',
        location: 'cehia',
        tags: [{tag: 'pls'}, {tag: 'mergi'}],
        creator: 'u1'
    },
    {
        id: 'g2',
        title: 'asdasf',
        description: 'cold beer',
        location: 'cehia',
        tags: [{tag: 'pls'}, {tag: 'mergi2'}],
        creator: 'u1'
    }
];

const getGroupById = (req, res, next) => {
    const placeId = req.params.pid;
    const group = DUMMY_GROUPS.find(g => {
        return g.id === placeId;
    });

    if (!group) {
        return next(new HttpError('Could not find a group with this id', 404));
    }

    res.json(group);
};

const getGroupsByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const group = DUMMY_GROUPS.filter(p => {
        return p.creator === userId;
    });

    if (!group.length) {

        return next(new HttpError('Could not find a group with provided user id', 404));
    }

    res.json(group);
};

const createGroup = (req, res, next) => {
    console.log('Creating new group!');
    const errors = validationResult(req); // valideaza componentele din req inainte de a trece mai departe si returneaza erori
    if(!errors.isEmpty()){ // daca nu e gol, i.e. exista erori, vom da throw la o eroare http
       console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }

    const {title, description, location, tags, creator} = req.body;
    const createdGroup = {
        title,
        description,
        location,
        tags,
        creator
    };

    DUMMY_GROUPS.push(createdGroup);

    res.status(201).json({group: createdGroup});

    console.log('New group created!');
};

const updateGroup = (req, res, next) => {
    const {title, description} = req.body;
    const groupId = req.params.pid;

    const updatedGroup = {...DUMMY_GROUPS.find(p => p.id === groupId)};
    const groupIndex = DUMMY_GROUPS.findIndex(p => p.id === groupId);
    updatedGroup.title = title;
    updatedGroup.description = description;
    console.log(updatedGroup);


    DUMMY_GROUPS[groupIndex] = updatedGroup;
    console.log(DUMMY_GROUPS);

    res.status(200).json({group: updatedGroup});
};

const deleteGroup = (req, res, next) => {
    const groupId = req.params.pid;
    DUMMY_GROUPS = DUMMY_GROUPS.filter(p => p.id !== groupId);
    res.status(200).json({message: "data deleted!"});
};

exports.getGroupById = getGroupById;
exports.getGroupsByUserId = getGroupsByUserId;
exports.createGroup = createGroup;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;
