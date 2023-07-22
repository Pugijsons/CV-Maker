"use client";
import './page.css';
import './styles.css';
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
          <li><label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          /></li>
          
          <li><label htmlFor="objective">Objective:</label>
          <input
            type="text"
            id="objective"
            name="objective"
            value={form.objective}
            onChange={handleChange}
            required
          /></li>

          <li><label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          /></li>

          <li><label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          /></li>

          <li><label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            name="website"
            value={form.website}
            onChange={handleChange}
            required
          /></li>

          <li><label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          /></li>
          </ul>
          
          <h2 className='title'>Job Experiences:</h2>
          {jobExperiences.map((experience, index) => (
            <div className='jobList' key={index}>
              <ul className='jobForm'>
              <li><label htmlFor={`company-${index}`}>Company:</label>
              <input
                type="text"
                id={`company-${index}`}
                name="company"
                value={experience.company}
                onChange={(e) => handleJobExperienceChange(index, e)}
                required
              /></li>

              <li><label htmlFor={`position-${index}`}>Position:</label>
              <input
                type="text"
                id={`position-${index}`}
                name="position"
                value={experience.position}
                onChange={(e) => handleJobExperienceChange(index, e)}
                required
              /></li>

              <li><label htmlFor={`description-${index}`}>Description:</label>
              <input
                type="text"
                id={`description-${index}`}
                name="description"
                value={experience.description}
                onChange={(e) => handleJobExperienceChange(index, e)}
                required
              /></li>

              <li><label htmlFor={`startYear-${index}`}>Start Year:</label>
              <input
                type="text"
                id={`startYear-${index}`}
                name="startYear"
                value={experience.startYear}
                onChange={(e) => handleJobExperienceChange(index, e)}
                required
              /></li>

              <li><label htmlFor={`endYear-${index}`}>End Year:</label>
              <input
                type="text"
                id={`endYear-${index}`}
                name="endYear"
                value={experience.endYear}
                onChange={(e) => handleJobExperienceChange(index, e)}
                required
              /></li>
              </ul>
              <button type="button" onClick={() => handleRemoveJobExperience(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddJobExperience}>Add Job Experience</button>

          <h2 className='title'>Education:</h2>
          {educations.map((education, index) => (
            <div key={index}>
              <ul className='educationForm'>
              <li><label htmlFor={`school-${index}`}>School:</label>
              <input
                type="text"
                id={`school-${index}`}
                name="school"
                value={education.school}
                onChange={(e) => handleEducationChange(index, e)}
                required
              /></li>

              <li><label htmlFor={`degree-${index}`}>Degree:</label>
              <input
                type="text"
                id={`degree-${index}`}
                name="degree"
                value={education.degree}
                onChange={(e) => handleEducationChange(index, e)}
                required
              /></li>

              <li><label htmlFor={`graduationYear-${index}`}>Graduation Year:</label>
              <input
                type="text"
                id={`graduationYear-${index}`}
                name="graduationYear"
                value={education.graduationYear}
                onChange={(e) => handleEducationChange(index, e)}
                required
              /></li>
              </ul>
              <button type="button" onClick={() => handleRemoveEducation(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddEducation}>Add Education</button>
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
        <button onClick={handleSubmit}>Download PDF</button>
        <button onClick={() => handleStyleChange("cv-default")}>Default Style</button>
        <button onClick={() => handleStyleChange("cv-dark")}>Dark Mode</button>
      </div>
    </div>
  );
}