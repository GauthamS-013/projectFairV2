const projects=require('../Models/projectModel')

exports.addProject=async(req,res)=>{
    try{
        console.log(req.body)
        const {title,description,languages,git,demo}=req.body
        const image=req.file.filename
        const userId=req.payload
        console.log(title,description,languages,git,demo,image,userId)
        const existing=await projects.findOne({github:git})
        if(existing){
            res.status(406).json("Project already exists.")
        }
        else{
            const newProject=new projects({
                title,description,languages,github:git,demo,image,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(e){
        console.log(e)
        res.status(400).json(e)
    }
}

exports.getUserProjects=async(req,res)=>{
    try{
        const userId=req.payload
        const projectlist=await projects.find({userId})
        res.status(200).json(projectlist)
    }
    catch(e){
        console.log(e)
        res.status(400).json(e)
    }
}



exports.getAllProjects = async (req, res) => {
  try {
    const searchKey = (req.query.search || "").trim();
    const selectedTech = (req.query.tech || "").trim();
    const sortBy = req.query.sortBy || "newest";

    const page = Math.max(
      1,
      parseInt(req.query.page, 10) || 1
    );

    const limit = 9;
    const skip = (page - 1) * limit;

    const query = {};

    // Search by project title OR technology stack
    if (searchKey) {
      const escapedSearch = searchKey.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      query.$or = [
        {
          title: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
        {
          languages: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
      ];
    }

    // Filter by a specific technology.
    // Assumes languages is a comma-separated string,
    // e.g. "React, Node.js, MongoDB".
    if (selectedTech && selectedTech !== "All") {
      const escapedTech = selectedTech.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      const techFilter = {
        languages: {
          $regex: `(^|,\\s*)${escapedTech}(\\s*,|$)`,
          $options: "i",
        },
      };

      // Combine search and technology filters with AND
      if (query.$or) {
        query.$and = [
          { $or: query.$or },
          techFilter,
        ];
        delete query.$or;
      } else {
        Object.assign(query, techFilter);
      }
    }

    // Sorting
    let sortOption;

    if (sortBy === "oldest") {
      sortOption = { createdAt: 1, _id: 1 };
    } else if (sortBy === "az") {
      sortOption = { title: 1, _id: 1 };
    } else {
      sortOption = { createdAt: -1, _id: -1 };
    }

    const [projectlist, totalProjects] = await Promise.all([
      projects
        .find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),

      projects.countDocuments(query),
    ]);

    res.status(200).json({
      projects: projectlist,
      currentPage: page,
      totalProjects,
      totalPages: Math.ceil(totalProjects / limit),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
};


// Get all available technologies for the filter dropdown
exports.getProjectTechnologies = async (req, res) => {
  try {
    const allLanguages = await projects.distinct("languages");

    const technologies = [
      ...new Set(
        allLanguages
          .flatMap((language) =>
            Array.isArray(language)
              ? language
              : String(language || "").split(",")
          )
          .map((tech) => tech.trim())
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));

    res.status(200).json(technologies);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Failed to fetch technologies",
    });
  }
};


exports.deleteProject=async(req,res)=>{
    try{
        const {id}=req.params
        const pro=await projects.findByIdAndDelete(id)
        res.status(200).json(pro)
    }
    catch(e){
        console.log(e)
        res.status(400).json(e)
    }
}

exports.updateProject=async(req,res)=>{
    try{
        const {id}=req.params
        const {title,description,languages,github,demo}=req.body
        if(req.file){
            var image=req.file.filename
        }else{
            var {image}=req.body
        }
        const userId=req.payload
        const pro=await projects.findByIdAndUpdate(id,{title,description,languages,github,demo,image})
        res.status(200).json(pro)
    }catch(e){
        console.log(e)
        res.status(400).json(e)
    }
}

exports.randomProjects=async(req,res)=>{
    try{
        const projectlist=await projects.find().limit(3)
        res.status(200).json(projectlist)
    }
    catch(e){
        console.log(e)
        res.status(400).json(e)
    }
}