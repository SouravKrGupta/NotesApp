const  Notes =require('../models/noteModel')
const DeletedNotes =require('../models/deletedNoteModel')

const noteController ={
    getNotes:async(req,res)=>{
        try {
         
            const notes =await Notes.find({user_id:req.user.id})
            res.json(notes)
        } catch (err) {
            return res.status(500).json({msg:err.message})

            
        }
    },
    createNotes:async(req,res)=>{
        try {
            const {title,content,date} = req.body;

            const newNote = new Notes({
                title,
                content,
                date,
                user_id:req.user.id,
                name:req.user.name
            })
            await newNote.save()
            res.json({msg:"Created a Note"})
        } catch (err) {
            return res.status(500).json({msg:err.message})
            
        }
    },
    deleteNote:async(req,res)=>{
        try {
            const deletedNote = await Notes.findByIdAndDelete(req.params.id);
            if (!deletedNote) {
                return res.status(404).json({ msg: "Note not found" });
            }
    
            // Save the deleted note to the DeletedNotes model
            const newDeletedNote = new DeletedNotes({
                title: deletedNote.title,
                content: deletedNote.content,
                date: deletedNote.date,
                user_id: deletedNote.user_id,
                name: deletedNote.name,
            });
            await newDeletedNote.save();
    
            res.json({ msg: "Deleted a Note" });
        } catch (err) {
            
            return res.status(500).json({ msg: err.message });
        }
    },
    updateNote:async(req,res) =>{
        try {
            const {title,content,date} =req.body;
            await Notes.findOneAndUpdate({_id:req.params.id},{
                title,
                content,
                date
            })
            res.json({msg:"Update aNote"})
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    getNote:async(req,res) =>{

        try {
           const note = await Notes.findById(req.params.id)
           res.json(note) 
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports =noteController