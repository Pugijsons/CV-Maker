"use client";
import { TextField } from '@mui/material';
import './page.css';
import './styles.css';
import Button from '@mui/material/Button';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState, useRef } from "react";

export default function Home() {

  const cvRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: '',
    objective: '',
    email: '',
    phone: '',
    website: '',
    address: '',
  });

  const [jobExperiences, setJobExperiences] = useState([
    {
      company: "",
      position: "",
      description: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const [educations, setEducations] = useState([
    {
      school: "",
      degree: "",
      graduationYear: "",
    },
  ]);

  const handleStyleChange = (style: string) => {
    setSelectedStyle(style);
  };

  const [selectedStyle, setSelectedStyle] = useState("cv-default");

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleJobExperienceChange = (index: any, e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    const updatedJobExperiences = [...jobExperiences];
    updatedJobExperiences[index] = {
      ...updatedJobExperiences[index],
      [name]: value,
    };
    setJobExperiences(updatedJobExperiences);
  };

  const handleAddJobExperience = () => {
    setJobExperiences([...jobExperiences, { company: "", position: "", description: "", startYear: "", endYear: "" }]);
  };

  const handleRemoveJobExperience = (index: number) => {
    const updatedJobExperiences = [...jobExperiences];
    updatedJobExperiences.splice(index, 1);
    setJobExperiences(updatedJobExperiences);
  };

  const handleEducationChange = (index: any, e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    const updatedEducations = [...educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [name]: value,
    };
    setEducations(updatedEducations);
  };

  const handleAddEducation = () => {
    setEducations([...educations, { school: "", degree: "", graduationYear: "" }]);
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };

  const handleSubmit = async () => {
    try {
      const pdfDocument = new jsPDF();
      if (cvRef.current) {
        const cvContainer = cvRef.current;
        if(selectedStyle == 'cv-dark'){
          pdfDocument.setFillColor('#0d0d26'); 
          pdfDocument.rect(0, 0, pdfDocument.internal.pageSize.width, pdfDocument.internal.pageSize.height, "F");
        }
        const canvas = await html2canvas(cvContainer);
        const imgData = canvas.toDataURL("image/png");
        pdfDocument.addImage(imgData, "PNG", 15, 15, 180, 0);
        const newWindow = window.open();
        newWindow?.location.replace(pdfDocument.output("bloburl"));
      }
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };

  return (
    <div className='container'>
      <div className='cv-form'>
        <form onSubmit={handleSubmit}>
          <h2 className='title'>Summary:</h2>
          <ul className='summaryForm'>
          <li><TextField id="outlined-basic" label="Name" variant="outlined" size = "small" type="text" margin = "dense"
            name="name"
            value={form.name}
            onChange={handleChange}
            required/>
            </li>
          
          <li><TextField id="outlined" label="Objective" variant="outlined" size = "small" type="text" margin = "dense" multiline= {true}
            name="objective"
            value={form.objective}
            onChange={handleChange}
            required/></li>

          <li>
          <TextField id="outlined" label="E-Mail" variant="outlined" size = "small" type="email" margin = "dense"
            name="email"
            value={form.email}
            onChange={handleChange}
            required/></li>

          <li><TextField id="outlined" label="Phone Number" variant="outlined" size = "small" type="text" margin = "dense"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required/>
            </li>

          <li><TextField id="outlined" label="Website" variant="outlined" size = "small" type="text" margin = "dense"
            name="website"
            value={form.website}
            onChange={handleChange}/>
          </li>

          <li><TextField id="outlined" label="Address" variant="outlined" size = "small" type="text" margin = "dense"
            name="address"
            value={form.address}
            onChange={handleChange}/>
            </li>
          </ul>
          
          <h2 className='title'>Job Experiences:</h2>
          {jobExperiences.map((experience, index) => (
            <div className='jobList' key={index}>
              <ul className='jobForm'>
              <li><TextField id="outlined" label="Company" variant="outlined" size = "small" type="text" margin = "dense"
              name="company"
              value={experience.company}
              onChange={(e) => handleJobExperienceChange(index, e)}
              required
            />
            </li>

            <li><TextField id="outlined" label="Position" variant="outlined" size = "small" type="text" margin = "dense"
              name="position"
              value={experience.position}
              onChange={(e) => handleJobExperienceChange(index, e)}
              required
            />
            </li>

            <li><TextField id="outlined" label="Description" variant="outlined" size = "small" type="text" margin = "dense" multiline = {true}
              name="description"
              value={experience.description}
              onChange={(e) => handleJobExperienceChange(index, e)}
              required
            />
            </li>

              <li><TextField id="outlined" label="Starting year" variant="outlined" size = "small" type="text" margin = "dense"
              name="startYear"
              value={experience.startYear}
              onChange={(e) => handleJobExperienceChange(index, e)}
              required
            /></li>

              <li><TextField id="outlined" label="End year" variant="outlined" size = "small" type="text" margin = "dense"
              name="endYear"
              value={experience.endYear}
              onChange={(e) => handleJobExperienceChange(index, e)}
              required
            /></li>
              </ul>
              <Button variant = 'contained' size = 'small' onClick={() => handleRemoveJobExperience(index)}>Remove</Button>
              <Button variant = 'contained' size = 'small' onClick={handleAddJobExperience}>Add Job Experience</Button>
            </div>
          ))}
          

          <h2 className='title'>Education:</h2>
          {educations.map((education, index) => (
            <div key={index}>
              <ul className='educationForm'>
              <li><TextField id="outlined" label="School" variant="outlined" size = "small" type="text" margin = "dense"
              name="school"
              value={education.school}
              onChange={(e) => handleEducationChange(index, e)}
              required
            /></li>

            <li><TextField id="outlined" label="Degree" variant="outlined" size = "small" type="text" margin = "dense"
              name="degree"
              value={education.degree}
              onChange={(e) => handleEducationChange(index, e)}
              required
            /></li>

            <li><TextField id="outlined" label="Year graduated" variant="outlined" size = "small" type="text" margin = "dense"
              name="graduationYear"
              value={education.graduationYear}
              onChange={(e) => handleEducationChange(index, e)}
              required
            /></li>
              </ul>
              <Button variant = 'contained' size = 'small' onClick={() => handleRemoveEducation(index)}>Remove</Button>
              <Button variant = 'contained' size = 'small' onClick={handleAddEducation}>Add Education</Button>
            </div>
          ))}
        </form></div>
        
      <div className={`cv-preview ${selectedStyle}`} ref={cvRef}>
      <div className="circle"></div>
        <div className="smallcircle"></div>
        <div className='overlay'>
          <h1>Summary</h1>
        </div>
        <div className='summaryBox'>
          <h2>{form.name}</h2>
          <p>Objective: {form.objective}</p>
          <p>Email: {form.email}</p>
          <p>Phone: {form.phone}</p>
          <p>Website: {form.website}</p>
          <p>Address: {form.address}</p>
        </div>

        <div className='spacer'>
          <h2>Job Experiences</h2>
        </div>

        {jobExperiences.map((experience, index) => (
          <ul className='qualificationsList'>
            <li>
              <div key={index} className='cv-job-experiences'>
                <h3>{experience.company}</h3>
                <p>Position: {experience.position} {experience.startYear} - {experience.endYear}</p>
                <p>Description: {experience.description}</p>
              </div>
            </li>
          </ul>
        ))}

        <div className='spacer'>
          <h2>Education</h2>
        </div>
        {educations.map((education, index) => (
          <ul className='qualificationsList'>
            <li>
            <div key={index} className='cv-educations'>
              <h3>{education.school}</h3>
              <p>Degree: {education.degree}</p>
              <p>Graduation Year: {education.graduationYear}</p>
            </div>
            </li>
          </ul>
        ))}
      </div>
      <div className='buttons'>
        <Button variant = 'contained' size = 'small' onClick={handleSubmit}>Download PDF</Button>
        <Button variant = 'contained' size = 'small' onClick={() => handleStyleChange("cv-default")}>Default Style</Button>
        <Button variant = 'contained' size = 'small' onClick={() => handleStyleChange("cv-dark")}>Dark Mode</Button>
      </div>
    </div>
  );
}