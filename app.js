/* --------------------------------------------------
   LuminaCV State Management & Application Logic
   -------------------------------------------------- */

// Application State
const state = {
    personal: {
        fullname: '',
        jobtitle: '',
        email: '',
        phone: '',
        website: '',
        location: '',
        avatar: '',
        summary: ''
    },
    experience: [], // { id, title, company, location, dates, desc }
    education: [],  // { id, degree, school, location, dates, desc }
    skills: [],     // { id, name, level }
    languages: [],   // { id, name, level }
    projects: [],   // { id, title, tech, desc, link }
    design: {
        template: 'split-sidebar',
        font: 'font-outfit',
        color: '#0ea5e9',
        sidebarBg: 'dark',
        padding: '25px',
        showAvatar: true,
        showSkillsBar: true,
        showProjects: true
    }
};

// Mock Sample Data
const sampleData = {
    personal: {
        fullname: 'Alex Morgan',
        jobtitle: 'Senior Full Stack Developer',
        email: 'alex.morgan@dev.com',
        phone: '+1 (555) 382-9902',
        website: 'alexmorgan.dev',
        location: 'San Francisco, CA',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
        summary: 'Innovative and performance-driven Software Engineer with 7+ years of experience designing, building, and optimizing web applications. Expert in React, Node.js, and Cloud Infrastructure. Passionate about writing clean, maintainable code and mentoring junior developers.'
    },
    experience: [
        {
            id: 'exp-1',
            title: 'Lead Software Engineer',
            company: 'TechFlow Systems',
            location: 'San Francisco, CA',
            dates: 'Jan 2024 - Present',
            desc: '• Led a team of 6 engineers to redesign and migrate legacy systems to micro-frontends (React/Next.js), boosting page speed by 45%.\n• Designed scalable RESTful & GraphQL APIs in Node.js, handling 10M+ daily transactions.\n• Championed CI/CD workflows and automated testing suites, reducing deployment failures by 30%.'
        },
        {
            id: 'exp-2',
            title: 'Senior Developer',
            company: 'PixelForge Studios',
            location: 'Remote',
            dates: 'Jun 2021 - Dec 2023',
            desc: '• Developed and deployed 12 client projects using React, Redux, and TailwindCSS.\n• Integrated headless CMS structures and Stripe checkout channels, increasing user conversion rate by 18%.\n• Conducted technical onboarding and training for incoming engineering hires.'
        }
    ],
    education: [
        {
            id: 'edu-1',
            degree: 'M.S. in Computer Science',
            school: 'Stanford University',
            location: 'Stanford, CA',
            dates: '2019 - 2021',
            desc: 'Specialized in Software Engineering and Distributed Computing Systems. GPA: 3.82/4.00'
        },
        {
            id: 'edu-2',
            degree: 'B.S. in Computer Science',
            school: 'UC Berkeley',
            location: 'Berkeley, CA',
            dates: '2015 - 2019',
            desc: 'Graduated with Honors. Focus on Database Systems and Web Architectures.'
        }
    ],
    skills: [
        { id: 'skill-1', name: 'JavaScript (ES6+) / TypeScript', level: 95 },
        { id: 'skill-2', name: 'React.js / Next.js', level: 90 },
        { id: 'skill-3', name: 'Node.js / Express', level: 85 },
        { id: 'skill-4', name: 'SQL / PostgreSQL / MongoDB', level: 80 },
        { id: 'skill-5', name: 'AWS (S3, Lambda, EC2)', level: 75 },
        { id: 'skill-6', name: 'Docker / CI/CD Systems', level: 70 }
    ],
    languages: [
        { id: 'lang-1', name: 'English', level: 100 },
        { id: 'lang-2', name: 'Spanish', level: 75 },
        { id: 'lang-3', name: 'German', level: 40 }
    ],
    projects: [
        {
            id: 'proj-1',
            title: 'TaskFlow Agile Board',
            tech: 'React, Node.js, WebSockets, MongoDB',
            desc: 'A real-time collaborative board application for agile sprints featuring kanban views, tasks assignment, and live notifications.',
            link: 'github.com/alexmorgan/taskflow'
        },
        {
            id: 'proj-2',
            title: 'CloudGuard Dashboard',
            tech: 'TypeScript, Next.js, ChartJS, AWS API',
            desc: 'A serverless security assessment dashboard mapping AWS IAM and S3 vulnerability risks across connected corporate cloud accounts.',
            link: 'cloudguard.alexmorgan.dev'
        }
    ],
    design: {
        template: 'split-sidebar',
        font: 'font-outfit',
        color: '#0ea5e9',
        sidebarBg: 'dark',
        padding: '25px',
        showAvatar: true,
        showSkillsBar: true,
        showProjects: true
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    setupTabSwitching();
    setupEventListeners();
    setupRepeaterTriggers();
    setupDesignControls();
    
    // Load sample data by default so user starts with a beautiful layout
    loadData(sampleData);
});

/* --------------------------------------------------
   Core Functions: Setup Tabs & Form Fields
   -------------------------------------------------- */

function setupTabSwitching() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

function setupEventListeners() {
    // Sync personal detail text inputs in real-time
    const inputs = [
        { id: 'input-fullname', key: 'fullname' },
        { id: 'input-jobtitle', key: 'jobtitle' },
        { id: 'input-email', key: 'email' },
        { id: 'input-phone', key: 'phone' },
        { id: 'input-website', key: 'website' },
        { id: 'input-location', key: 'location' },
        { id: 'input-avatar', key: 'avatar' },
        { id: 'input-summary', key: 'summary' }
    ];
    
    inputs.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
            element.addEventListener('input', (e) => {
                state.personal[item.key] = e.target.value;
                updateCVPreview();
            });
        }
    });
    
    // Demo Avatar Button helper
    document.getElementById('btn-avatar-demo').addEventListener('click', () => {
        const demoImg = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop';
        document.getElementById('input-avatar').value = demoImg;
        state.personal.avatar = demoImg;
        updateCVPreview();
    });
    
    // System Actions
    document.getElementById('btn-load-sample').addEventListener('click', () => {
        loadData(sampleData);
    });
    
    document.getElementById('btn-reset').addEventListener('click', () => {
        if(confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            clearAllData();
        }
    });
    
    document.getElementById('btn-print').addEventListener('click', () => {
        window.print();
    });
}

function setupRepeaterTriggers() {
    // Work Experience
    document.getElementById('btn-add-experience').addEventListener('click', () => {
        addExperienceItem();
    });
    
    // Education
    document.getElementById('btn-add-education').addEventListener('click', () => {
        addEducationItem();
    });
    
    // Skills
    document.getElementById('btn-add-skill').addEventListener('click', () => {
        addSkillItem();
    });
    
    // Languages
    document.getElementById('btn-add-language').addEventListener('click', () => {
        addLanguageItem();
    });
    
    // Projects
    document.getElementById('btn-add-project').addEventListener('click', () => {
        addProjectItem();
    });
}

function setupDesignControls() {
    // Template Style Selector
    const templateSelect = document.getElementById('select-template');
    templateSelect.addEventListener('change', (e) => {
        state.design.template = e.target.value;
        
        // Hide/Show template specific options
        const sidebarBgGroup = document.getElementById('select-sidebar-bg').closest('.form-group');
        if(e.target.value === 'split-sidebar') {
            sidebarBgGroup.style.display = 'flex';
        } else {
            sidebarBgGroup.style.display = 'none';
        }
        
        updateCVPreview();
    });
    
    // Typography Font Selector
    const fontSelect = document.getElementById('select-font');
    fontSelect.addEventListener('change', (e) => {
        state.design.font = e.target.value;
        updateCVPreview();
    });
    
    // Sidebar background choice
    const sidebarBgSelect = document.getElementById('select-sidebar-bg');
    sidebarBgSelect.addEventListener('change', (e) => {
        state.design.sidebarBg = e.target.value;
        updateCVPreview();
    });
    
    // Page Margins Slider
    const marginRange = document.getElementById('range-margins');
    const marginValueSpan = document.getElementById('margins-val');
    marginRange.addEventListener('input', (e) => {
        state.design.padding = `${e.target.value}px`;
        marginValueSpan.textContent = state.design.padding;
        updateCVPreview();
    });
    
    // Accent Color Swatches
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const customColorPicker = document.getElementById('custom-color-picker');
    
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            
            const color = swatch.getAttribute('data-color');
            state.design.color = color;
            customColorPicker.value = color;
            updateCVPreview();
        });
    });
    
    customColorPicker.addEventListener('input', (e) => {
        colorSwatches.forEach(s => s.classList.remove('active'));
        state.design.color = e.target.value;
        updateCVPreview();
    });
    
    // Toggles
    const toggleAvatar = document.getElementById('chk-show-avatar');
    toggleAvatar.addEventListener('change', (e) => {
        state.design.showAvatar = e.target.checked;
        updateCVPreview();
    });
    
    const toggleSkillsBar = document.getElementById('chk-show-skills-bar');
    toggleSkillsBar.addEventListener('change', (e) => {
        state.design.showSkillsBar = e.target.checked;
        updateCVPreview();
    });
    
    const toggleProjects = document.getElementById('chk-show-projects');
    toggleProjects.addEventListener('change', (e) => {
        state.design.showProjects = e.target.checked;
        updateCVPreview();
    });
}

/* --------------------------------------------------
   State Mutators: Loading & Clearing Data
   -------------------------------------------------- */

function loadData(data) {
    // Personal Details
    state.personal = { ...data.personal };
    for (const key in state.personal) {
        const el = document.getElementById(`input-${key}`);
        if (el) el.value = state.personal[key];
    }
    
    // Experience
    state.experience = JSON.parse(JSON.stringify(data.experience));
    renderFormExperienceList();
    
    // Education
    state.education = JSON.parse(JSON.stringify(data.education));
    renderFormEducationList();
    
    // Skills
    state.skills = JSON.parse(JSON.stringify(data.skills));
    renderFormSkillsList();
    
    // Languages
    state.languages = JSON.parse(JSON.stringify(data.languages));
    renderFormLanguagesList();
    
    // Projects
    state.projects = JSON.parse(JSON.stringify(data.projects));
    renderFormProjectsList();
    
    // Design
    state.design = { ...data.design };
    document.getElementById('select-template').value = state.design.template;
    document.getElementById('select-font').value = state.design.font;
    document.getElementById('select-sidebar-bg').value = state.design.sidebarBg;
    document.getElementById('range-margins').value = parseInt(state.design.padding);
    document.getElementById('margins-val').textContent = state.design.padding;
    document.getElementById('custom-color-picker').value = state.design.color;
    
    // Color Swatch active styling matching color
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(s => {
        if (s.getAttribute('data-color') === state.design.color) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
    
    document.getElementById('chk-show-avatar').checked = state.design.showAvatar;
    document.getElementById('chk-show-skills-bar').checked = state.design.showSkillsBar;
    document.getElementById('chk-show-projects').checked = state.design.showProjects;
    
    // Update live CV canvas preview
    updateCVPreview();
}

function clearAllData() {
    // Clear state
    state.personal = { fullname: '', jobtitle: '', email: '', phone: '', website: '', location: '', avatar: '', summary: '' };
    state.experience = [];
    state.education = [];
    state.skills = [];
    state.languages = [];
    state.projects = [];
    
    // Clear textboxes
    const personalKeys = ['fullname', 'jobtitle', 'email', 'phone', 'website', 'location', 'avatar', 'summary'];
    personalKeys.forEach(k => {
        document.getElementById(`input-${k}`).value = '';
    });
    
    // Re-render lists
    renderFormExperienceList();
    renderFormEducationList();
    renderFormSkillsList();
    renderFormLanguagesList();
    renderFormProjectsList();
    
    updateCVPreview();
}

/* --------------------------------------------------
   Form Item Renderer: List Builders & Repeaters
   -------------------------------------------------- */

// Work Experience Repeater Form UI
function renderFormExperienceList() {
    const list = document.getElementById('experience-list');
    list.innerHTML = '';
    
    state.experience.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'repeater-card';
        card.innerHTML = `
            <button class="card-remove-btn" onclick="removeExperience('${item.id}')" title="Delete">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="repeater-card-title">
                <i class="fa-solid fa-briefcase"></i> Job Position #${index + 1}
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" value="${item.title}" oninput="updateExperience('${item.id}', 'title', this.value)" placeholder="Project Manager">
                </div>
                <div class="form-group">
                    <label>Company / Employer</label>
                    <input type="text" value="${item.company}" oninput="updateExperience('${item.id}', 'company', this.value)" placeholder="Google LLC">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" value="${item.location}" oninput="updateExperience('${item.id}', 'location', this.value)" placeholder="New York, NY">
                </div>
                <div class="form-group">
                    <label>Dates (Start - End)</label>
                    <input type="text" value="${item.dates}" oninput="updateExperience('${item.id}', 'dates', this.value)" placeholder="Jan 2022 - Present">
                </div>
                <div class="form-group col-span-2">
                    <label>Job Description / Key Accomplishments</label>
                    <textarea rows="4" oninput="updateExperience('${item.id}', 'desc', this.value)" placeholder="• Accomplished tasks...\n• Managed teams...">${item.desc}</textarea>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}

function addExperienceItem() {
    const newItem = {
        id: `exp-${Date.now()}`,
        title: '',
        company: '',
        location: '',
        dates: '',
        desc: ''
    };
    state.experience.push(newItem);
    renderFormExperienceList();
    updateCVPreview();
}

window.updateExperience = function(id, key, value) {
    const item = state.experience.find(exp => exp.id === id);
    if (item) {
        item[key] = value;
        updateCVPreview();
    }
}

window.removeExperience = function(id) {
    state.experience = state.experience.filter(exp => exp.id !== id);
    renderFormExperienceList();
    updateCVPreview();
}

// Education Repeater Form UI
function renderFormEducationList() {
    const list = document.getElementById('education-list');
    list.innerHTML = '';
    
    state.education.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'repeater-card';
        card.innerHTML = `
            <button class="card-remove-btn" onclick="removeEducation('${item.id}')" title="Delete">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="repeater-card-title">
                <i class="fa-solid fa-graduation-cap"></i> Degree/Program #${index + 1}
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Degree / Qualification</label>
                    <input type="text" value="${item.degree}" oninput="updateEducation('${item.id}', 'degree', this.value)" placeholder="B.Sc. in Civil Engineering">
                </div>
                <div class="form-group">
                    <label>School / University</label>
                    <input type="text" value="${item.school}" oninput="updateEducation('${item.id}', 'school', this.value)" placeholder="University of Moratuwa">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" value="${item.location}" oninput="updateEducation('${item.id}', 'location', this.value)" placeholder="Colombo, Sri Lanka">
                </div>
                <div class="form-group">
                    <label>Graduation Date / Period</label>
                    <input type="text" value="${item.dates}" oninput="updateEducation('${item.id}', 'dates', this.value)" placeholder="2018 - 2022">
                </div>
                <div class="form-group col-span-2">
                    <label>Additional Info (GPA, Honors, Activities)</label>
                    <textarea rows="3" oninput="updateEducation('${item.id}', 'desc', this.value)" placeholder="GPA: 3.75, First Class Honors">${item.desc}</textarea>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}

function addEducationItem() {
    const newItem = {
        id: `edu-${Date.now()}`,
        degree: '',
        school: '',
        location: '',
        dates: '',
        desc: ''
    };
    state.education.push(newItem);
    renderFormEducationList();
    updateCVPreview();
}

window.updateEducation = function(id, key, value) {
    const item = state.education.find(edu => edu.id === id);
    if (item) {
        item[key] = value;
        updateCVPreview();
    }
}

window.removeEducation = function(id) {
    state.education = state.education.filter(edu => edu.id !== id);
    renderFormEducationList();
    updateCVPreview();
}

// Skills Repeater Form UI
function renderFormSkillsList() {
    const list = document.getElementById('skills-list');
    list.innerHTML = '';
    
    state.skills.forEach(item => {
        const row = document.createElement('div');
        row.className = 'tag-repeater-item';
        row.innerHTML = `
            <input type="text" value="${item.name}" oninput="updateSkill('${item.id}', 'name', this.value)" placeholder="HTML / CSS">
            <input type="range" min="10" max="100" value="${item.level}" oninput="updateSkill('${item.id}', 'level', this.value)" title="Skill Level: ${item.level}%">
            <button class="tag-remove-btn" onclick="removeSkill('${item.id}')" title="Delete">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        list.appendChild(row);
    });
}

function addSkillItem() {
    const newItem = {
        id: `skill-${Date.now()}`,
        name: '',
        level: 80
    };
    state.skills.push(newItem);
    renderFormSkillsList();
    updateCVPreview();
}

window.updateSkill = function(id, key, value) {
    const item = state.skills.find(sk => sk.id === id);
    if (item) {
        item[key] = key === 'level' ? parseInt(value) : value;
        updateCVPreview();
    }
}

window.removeSkill = function(id) {
    state.skills = state.skills.filter(sk => sk.id !== id);
    renderFormSkillsList();
    updateCVPreview();
}

// Languages Repeater Form UI
function renderFormLanguagesList() {
    const list = document.getElementById('languages-list');
    list.innerHTML = '';
    
    state.languages.forEach(item => {
        const row = document.createElement('div');
        row.className = 'tag-repeater-item';
        row.innerHTML = `
            <input type="text" value="${item.name}" oninput="updateLanguage('${item.id}', 'name', this.value)" placeholder="English">
            <input type="range" min="10" max="100" value="${item.level}" oninput="updateLanguage('${item.id}', 'level', this.value)" title="Proficiency Level: ${item.level}%">
            <button class="tag-remove-btn" onclick="removeLanguage('${item.id}')" title="Delete">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        list.appendChild(row);
    });
}

function addLanguageItem() {
    const newItem = {
        id: `lang-${Date.now()}`,
        name: '',
        level: 80
    };
    state.languages.push(newItem);
    renderFormLanguagesList();
    updateCVPreview();
}

window.updateLanguage = function(id, key, value) {
    const item = state.languages.find(l => l.id === id);
    if (item) {
        item[key] = key === 'level' ? parseInt(value) : value;
        updateCVPreview();
    }
}

window.removeLanguage = function(id) {
    state.languages = state.languages.filter(l => l.id !== id);
    renderFormLanguagesList();
    updateCVPreview();
}

// Projects Repeater Form UI
function renderFormProjectsList() {
    const list = document.getElementById('projects-list');
    list.innerHTML = '';
    
    state.projects.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'repeater-card';
        card.innerHTML = `
            <button class="card-remove-btn" onclick="removeProject('${item.id}')" title="Delete">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="repeater-card-title">
                <i class="fa-solid fa-code"></i> Project #${index + 1}
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" value="${item.title}" oninput="updateProject('${item.id}', 'title', this.value)" placeholder="Personal Portfolio Website">
                </div>
                <div class="form-group">
                    <label>Technologies Used</label>
                    <input type="text" value="${item.tech}" oninput="updateProject('${item.id}', 'tech', this.value)" placeholder="HTML, CSS, JS">
                </div>
                <div class="form-group col-span-2">
                    <label>Project Link / URL (Optional)</label>
                    <input type="text" value="${item.link}" oninput="updateProject('${item.id}', 'link', this.value)" placeholder="github.com/myproject">
                </div>
                <div class="form-group col-span-2">
                    <label>Description</label>
                    <textarea rows="3" oninput="updateProject('${item.id}', 'desc', this.value)" placeholder="Brief description of the work and stack used...">${item.desc}</textarea>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}

function addProjectItem() {
    const newItem = {
        id: `proj-${Date.now()}`,
        title: '',
        tech: '',
        link: '',
        desc: ''
    };
    state.projects.push(newItem);
    renderFormProjectsList();
    updateCVPreview();
}

window.updateProject = function(id, key, value) {
    const item = state.projects.find(p => p.id === id);
    if (item) {
        item[key] = value;
        updateCVPreview();
    }
}

window.removeProject = function(id) {
    state.projects = state.projects.filter(p => p.id !== id);
    renderFormProjectsList();
    updateCVPreview();
}

/* --------------------------------------------------
   CV preview renderer (Compiles state into DOM structures)
   -------------------------------------------------- */

function updateCVPreview() {
    const preview = document.getElementById('cv-preview-page');
    if (!preview) return;
    
    // Clear out class states and update design properties
    preview.className = `cv-page template-${state.design.template} ${state.design.font}`;
    preview.style.setProperty('--accent-color', state.design.color);
    preview.style.setProperty('--cv-accent', state.design.color);
    preview.style.setProperty('--page-padding', state.design.padding);
    
    // Process profile photo toggle
    const avatarPath = state.personal.avatar;
    const showAvatar = state.design.showAvatar && avatarPath.trim() !== '';
    
    // Build child sections
    const emailHtml = state.personal.email ? `<li id="cv-contact-email-item"><i class="fa-solid fa-envelope"></i><span>${state.personal.email}</span></li>` : '';
    const phoneHtml = state.personal.phone ? `<li id="cv-contact-phone-item"><i class="fa-solid fa-phone"></i><span>${state.personal.phone}</span></li>` : '';
    const websiteHtml = state.personal.website ? `<li id="cv-contact-website-item"><i class="fa-solid fa-globe"></i><span>${state.personal.website}</span></li>` : '';
    const locationHtml = state.personal.location ? `<li id="cv-contact-location-item"><i class="fa-solid fa-location-dot"></i><span>${state.personal.location}</span></li>` : '';
    
    const contactHtml = `
        <ul class="cv-contact-list">
            ${emailHtml}
            ${phoneHtml}
            ${websiteHtml}
            ${locationHtml}
        </ul>
    `;
    
    // Skills formatting
    let skillsHtml = '';
    if (state.skills.length > 0) {
        if (state.design.showSkillsBar && state.design.template !== 'minimal') {
            // Render progress bars
            skillsHtml = state.skills.map(sk => `
                <div class="skill-bar-item">
                    <div class="skill-bar-header">
                        <span>${sk.name || 'Skill'}</span>
                        <span>${sk.level}%</span>
                    </div>
                    <div class="skill-bar-track">
                        <div class="skill-bar-fill" style="width: ${sk.level}%"></div>
                    </div>
                </div>
            `).join('');
        } else {
            // Render basic badges
            skillsHtml = `
                <div class="skill-badge-container">
                    ${state.skills.map(sk => `<span class="skill-badge">${sk.name || 'Skill'}</span>`).join('')}
                </div>
            `;
        }
    }
    
    // Languages formatting
    let languagesHtml = '';
    if (state.languages.length > 0) {
        languagesHtml = state.languages.map(lang => {
            const levelLabel = getLanguageLevelLabel(lang.level);
            return `
                <div class="cv-lang-item">
                    <strong>${lang.name || 'Language'}</strong>
                    <span>${levelLabel}</span>
                </div>
            `;
        }).join('');
    }
    
    // Work Experience formatting
    let experienceHtml = '';
    if (state.experience.length > 0) {
        experienceHtml = state.experience.map(exp => `
            <div class="timeline-item cv-item">
                <div class="cv-item-header">
                    <div class="cv-item-title">${exp.title || 'Job Position'}</div>
                    <div class="cv-item-date">${exp.dates || 'Date range'}</div>
                </div>
                <div class="cv-item-subtitle">${exp.company || 'Company'} ${exp.location ? `| ${exp.location}` : ''}</div>
                ${exp.desc ? `<div class="cv-item-desc">${exp.desc}</div>` : ''}
            </div>
        `).join('');
    }
    
    // Education formatting
    let educationHtml = '';
    if (state.education.length > 0) {
        educationHtml = state.education.map(edu => `
            <div class="timeline-item cv-item">
                <div class="cv-item-header">
                    <div class="cv-item-title">${edu.degree || 'Degree Qualification'}</div>
                    <div class="cv-item-date">${edu.dates || 'Graduation date'}</div>
                </div>
                <div class="cv-item-subtitle">${edu.school || 'University'} ${edu.location ? `| ${edu.location}` : ''}</div>
                ${edu.desc ? `<div class="cv-item-desc">${edu.desc}</div>` : ''}
            </div>
        `).join('');
    }
    
    // Projects formatting
    let projectsHtml = '';
    if (state.design.showProjects && state.projects.length > 0) {
        projectsHtml = state.projects.map(proj => `
            <div class="cv-project-item">
                <div class="cv-item-header">
                    <div class="cv-item-title" style="font-size: 0.95rem;">${proj.title || 'Project Name'}</div>
                </div>
                <div class="cv-item-subtitle" style="font-size: 0.8rem; color: var(--cv-accent); font-weight:500; margin-bottom: 0.25rem;">${proj.tech || 'Technologies'}</div>
                ${proj.desc ? `<div class="cv-item-desc" style="font-size:0.85rem; margin-bottom: 0.25rem;">${proj.desc}</div>` : ''}
                ${proj.link ? `<a href="https://${proj.link}" target="_blank" class="cv-project-link"><i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.75rem;"></i> ${proj.link}</a>` : ''}
            </div>
        `).join('');
    }
    
    // Compile into DOM structures based on the selected layout
    if (state.design.template === 'split-sidebar') {
        renderSplitSidebarTemplate(showAvatar, avatarPath, contactHtml, skillsHtml, languagesHtml, experienceHtml, educationHtml, projectsHtml);
    } else if (state.design.template === 'modern') {
        renderModernTemplate(showAvatar, avatarPath, contactHtml, skillsHtml, languagesHtml, experienceHtml, educationHtml, projectsHtml);
    } else if (state.design.template === 'executive') {
        renderExecutiveTemplate(showAvatar, avatarPath, contactHtml, skillsHtml, languagesHtml, experienceHtml, educationHtml, projectsHtml);
    } else { // Minimal
        renderMinimalTemplate(contactHtml, skillsHtml, languagesHtml, experienceHtml, educationHtml, projectsHtml);
    }
}

function getLanguageLevelLabel(level) {
    if (level >= 90) return 'Native';
    if (level >= 75) return 'Fluent';
    if (level >= 50) return 'Intermediate';
    return 'Basic';
}

/* --------------------------------------------------
   Layout Injectors for Preview
   -------------------------------------------------- */

function renderSplitSidebarTemplate(showAvatar, avatarPath, contactHtml, skillsHtml, languagesHtml, experienceHtml, educationHtml, projectsHtml) {
    const preview = document.getElementById('cv-preview-page');
    const sidebarClass = `cv-sidebar sidebar-style-${state.design.sidebarBg}`;
    
    preview.innerHTML = `
        <div class="cv-split-container">
            <aside class="${sidebarClass}">
                <div class="cv-sidebar-header">
                    <div class="cv-avatar-container" style="display: ${showAvatar ? 'block' : 'none'};">
                        <img src="${avatarPath}" alt="Avatar">
                    </div>
                    <h1>${state.personal.fullname || 'Your Name'}</h1>
                    <p>${state.personal.jobtitle || 'Professional Title'}</p>
                </div>
                <div class="cv-sidebar-section">
                    <h3 class="sidebar-sec-title">Contact</h3>
                    ${contactHtml}
                </div>
                ${skillsHtml ? `
                <div class="cv-sidebar-section">
                    <h3 class="sidebar-sec-title">Skills</h3>
                    <div class="cv-skills-grid">${skillsHtml}</div>
                </div>` : ''}
                ${languagesHtml ? `
                <div class="cv-sidebar-section">
                    <h3 class="sidebar-sec-title">Languages</h3>
                    <div class="cv-languages-list">${languagesHtml}</div>
                </div>` : ''}
            </aside>
            <div class="cv-main-content">
                ${state.personal.summary ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Profile Summary</h2>
                    <p class="cv-item-desc">${state.personal.summary}</p>
                </section>` : ''}
                ${experienceHtml ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Work Experience</h2>
                    <div class="timeline-container">${experienceHtml}</div>
                </section>` : ''}
                ${educationHtml ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Education</h2>
                    <div class="timeline-container">${educationHtml}</div>
                </section>` : ''}
                ${projectsHtml ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Projects</h2>
                    <div class="projects-grid">${projectsHtml}</div>
                </section>` : ''}
            </div>
        </div>
    `;
}

function renderModernTemplate(showAvatar, avatarPath, contactHtml, skillsHtml, languagesHtml, experienceHtml, educationHtml, projectsHtml) {
    const preview = document.getElementById('cv-preview-page');
    
    preview.innerHTML = `
        <div class="cv-split-container">
            <header class="cv-sidebar-header" style="border-bottom-color: var(--accent-color);">
                <div class="cv-avatar-container" style="display: ${showAvatar ? 'block' : 'none'}; float: left; margin: 0 1.5rem 0.5rem 0;">
                    <img src="${avatarPath}" alt="Avatar">
                </div>
                <h1>${state.personal.fullname || 'Your Name'}</h1>
                <p>${state.personal.jobtitle || 'Professional Title'}</p>
                <div style="margin-top: 0.75rem;">
                    ${contactHtml}
                </div>
            </header>
            
            <div class="cv-main-content" style="padding: 0;">
                ${state.personal.summary ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Profile Summary</h2>
                    <p class="cv-item-desc">${state.personal.summary}</p>
                </section>` : ''}
                
                ${experienceHtml ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Work Experience</h2>
                    <div class="timeline-container">${experienceHtml}</div>
                </section>` : ''}
                
                ${educationHtml ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Education</h2>
                    <div class="timeline-container">${educationHtml}</div>
                </section>` : ''}
                
                ${projectsHtml ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Projects</h2>
                    <div class="projects-grid">${projectsHtml}</div>
                </section>` : ''}
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    ${skillsHtml ? `
                    <section class="cv-section">
                        <h2 class="cv-section-title">Skills</h2>
                        <div class="cv-skills-grid">${skillsHtml}</div>
                    </section>` : ''}
                    
                    ${languagesHtml ? `
                    <section class="cv-section">
                        <h2 class="cv-section-title">Languages</h2>
                        <div class="cv-languages-list" style="margin-top: 0.5rem;">${languagesHtml}</div>
                    </section>` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderExecutiveTemplate(showAvatar, avatarPath, contactHtml, skillsHtml, languagesHtml, experienceHtml, educationHtml, projectsHtml) {
    const preview = document.getElementById('cv-preview-page');
    
    // Custom executive style puts a top bar
    preview.innerHTML = `
        <div class="cv-split-container">
            <header class="cv-sidebar-header" style="border-top: 6px solid var(--accent-color);">
                <div class="cv-avatar-container" style="display: ${showAvatar ? 'block' : 'none'}; width: 90px; height: 90px; margin-bottom: 0.5rem;">
                    <img src="${avatarPath}" alt="Avatar">
                </div>
                <h1>${state.personal.fullname || 'Your Name'}</h1>
                <p>${state.personal.jobtitle || 'Professional Title'}</p>
                ${contactHtml}
            </header>
            
            <div style="display: flex; gap: 1.5rem;">
                <div style="width: 65%;">
                    ${state.personal.summary ? `
                    <section class="cv-section">
                        <h2 class="cv-section-title">Executive Summary</h2>
                        <p class="cv-item-desc">${state.personal.summary}</p>
                    </section>` : ''}
                    
                    ${experienceHtml ? `
                    <section class="cv-section">
                        <h2 class="cv-section-title">Work Experience</h2>
                        <div class="timeline-container">${experienceHtml}</div>
                    </section>` : ''}
                    
                    ${educationHtml ? `
                    <section class="cv-section">
                        <h2 class="cv-section-title">Education</h2>
                        <div class="timeline-container">${educationHtml}</div>
                    </section>` : ''}
                </div>
                
                <div style="width: 35%; display: flex; flex-direction: column; gap: 1rem;">
                    ${skillsHtml ? `
                    <section class="cv-section">
                        <h2 class="cv-section-title">Competencies</h2>
                        <div class="cv-skills-grid" style="display:flex; flex-direction:column; gap:0.5rem;">${skillsHtml}</div>
                    </section>` : ''}
                    
                    ${languagesHtml ? `
                    <section class="cv-section">
                        <h2 class="cv-section-title">Languages</h2>
                        <div class="cv-languages-list" style="display:flex; flex-direction:column; gap:0.4rem;">${languagesHtml}</div>
                    </section>` : ''}
                    
                    ${projectsHtml ? `
                    <section class="cv-section">
                        <h2 class="cv-section-title">Key Projects</h2>
                        <div class="projects-grid" style="grid-template-columns:1fr; gap:0.75rem;">${projectsHtml}</div>
                    </section>` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderMinimalTemplate(contactHtml, skillsHtml, languagesHtml, experienceHtml, educationHtml, projectsHtml) {
    const preview = document.getElementById('cv-preview-page');
    
    preview.innerHTML = `
        <div class="cv-split-container">
            <header class="cv-sidebar-header" style="border-bottom: 1px solid #cbd5e1; margin-bottom: 1.5rem; padding-bottom: 1rem;">
                <h1 style="font-size: 2.4rem; font-weight: 300; letter-spacing: -0.5px; color:#0f172a;">${state.personal.fullname || 'Your Name'}</h1>
                <p style="font-size: 1.1rem; color: #475569; font-weight: 400; margin-top: 0.1rem;">${state.personal.jobtitle || 'Professional Title'}</p>
                <div style="margin-top: 0.75rem;">
                    ${contactHtml}
                </div>
            </header>
            
            <div class="cv-main-content" style="padding: 0;">
                ${state.personal.summary ? `
                <section class="cv-section">
                    <h2 class="cv-section-title" style="border-bottom: 1px solid #cbd5e1; color: #0f172a; font-weight: 600;">Summary</h2>
                    <p class="cv-item-desc" style="color: #334155;">${state.personal.summary}</p>
                </section>` : ''}
                
                ${experienceHtml ? `
                <section class="cv-section">
                    <h2 class="cv-section-title" style="border-bottom: 1px solid #cbd5e1; color: #0f172a; font-weight: 600;">Professional History</h2>
                    <div>${experienceHtml}</div>
                </section>` : ''}
                
                ${educationHtml ? `
                <section class="cv-section">
                    <h2 class="cv-section-title" style="border-bottom: 1px solid #cbd5e1; color: #0f172a; font-weight: 600;">Academic Background</h2>
                    <div>${educationHtml}</div>
                </section>` : ''}
                
                ${projectsHtml ? `
                <section class="cv-section">
                    <h2 class="cv-section-title" style="border-bottom: 1px solid #cbd5e1; color: #0f172a; font-weight: 600;">Side Projects</h2>
                    <div class="projects-grid">${projectsHtml}</div>
                </section>` : ''}
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    ${skillsHtml ? `
                    <section class="cv-section">
                        <h2 class="cv-section-title" style="border-bottom: 1px solid #cbd5e1; color: #0f172a; font-weight: 600;">Skills</h2>
                        <div class="cv-skills-grid">${skillsHtml}</div>
                    </section>` : ''}
                    
                    ${languagesHtml ? `
                    <section class="cv-section">
                        <h2 class="cv-section-title" style="border-bottom: 1px solid #cbd5e1; color: #0f172a; font-weight: 600;">Languages</h2>
                        <div class="cv-languages-list" style="margin-top: 0.5rem;">${languagesHtml}</div>
                    </section>` : ''}
                </div>
            </div>
        </div>
    `;
}
