// Shared simulated data & AI functions for Employee/Admin portals
const SHARED = (function(){
  const EMPLOYEES = [
    {id:1,name:'Anya Sharma', role:'Senior Manager, Operations', target:'VP Operations', performance:4, potential:4, readiness:78, adc:82},
    {id:2,name:'John Doe', role:'Director Finance', target:'CFO', performance:5, potential:4, readiness:92, adc:90},
    {id:3,name:'Jane Smith', role:'Sr Manager HR', target:'Head HR', performance:4, potential:3, readiness:60, adc:70},
    {id:4,name:'Amit Kumar', role:'Asst Manager Civil', target:'GM Civil', performance:2, potential:2, readiness:30, adc:55}
  ];

  const ACTIVITIES = [
    {id:'A1',title:'Advanced Strategic Leadership Workshop',type:'Training',impact:15,duration:'2 weeks'},
    {id:'A2',title:'Job Rotation - Finance Department',type:'Rotation',impact:20,duration:'3 months'},
    {id:'A3',title:'Mentorship with Director Operations',type:'Mentorship',impact:10,duration:'6 months'},
    {id:'A4',title:'Digital Transformation Project Lead',type:'Project',impact:18,duration:'4 months'}
  ];

  const AI_TIPS = [
    "Focus on completing your Strategic Leadership module this week. Your progress shows strong engagement—keep it up!",
    "Consider scheduling your mentor session soon. Regular interactions boost development by 35%.",
    "You're 78% ready for the target role. Top performers at this stage focus on financial acumen next.",
    "Tip: Your communication skills are a strength. Leverage them in the upcoming team presentations.",
    "Based on similar profiles, completing the Finance Rotation will increase your readiness to 85%.",
    "Great progress! You're ahead of 68% of peers in your cohort. Stay consistent with your IDP activities."
  ];

  const AI_RESPONSES = {
    'timeline': "Based on your current pace, you're on track to reach 90% readiness in 14 months. To accelerate, I recommend prioritizing the Finance Rotation next quarter.",
    'gaps': "Your top 3 competency gaps are: Strategic Thinking (-20pts), Financial Acumen (-15pts), and Stakeholder Management (-12pts). The recommended activities target these specifically.",
    'mentor': "Your mentor Mr. K. Sharma has 15+ years in Operations and has successfully mentored 8 high-potential employees. AI match quality is 9.2/10 based on expertise alignment and availability.",
    'next': "Your next recommended action is to enroll in the Advanced Strategic Leadership Workshop starting next month. This will address your largest competency gap.",
    'help': "I can help you with: understanding your development timeline, clarifying competency gaps, mentor guidance, activity recommendations, or progress tracking. What would you like to know?",
    'default': "That's a great question! I recommend discussing this with your mentor during your next check-in. Meanwhile, focus on your current IDP activities to maintain momentum."
  };

  function simulateIDP(employee){
    const gap = Math.max(0, 100 - employee.readiness);
    const recs = ACTIVITIES.slice(0,3).map((a,i)=>({
      ...a, 
      predictedImpact: a.impact, 
      status: i===0?'In Progress': i===1?'Planned':'Pending',
      deadline: new Date(Date.now() + (i+1)*30*24*60*60*1000).toLocaleDateString()
    }));
    return {
      employee, 
      gap, 
      recs, 
      timeline:[
        {date:'2025-09-01',text:'Assigned to Strategic Leadership Workshop',status:'completed'},
        {date:'2025-10-01',text:'Mentor session scheduled with K. Sharma',status:'completed'}, 
        {date:'2025-11-15',text:'Finance Rotation begins',status:'upcoming'},
        {date:'2026-02-01',text:'Mid-year development review',status:'upcoming'}
      ]
    };
  }

  function getAIResponse(query){
    const q = query.toLowerCase();
    if(q.includes('timeline') || q.includes('when') || q.includes('ready')) return AI_RESPONSES.timeline;
    if(q.includes('gap') || q.includes('skill') || q.includes('competenc')) return AI_RESPONSES.gaps;
    if(q.includes('mentor')) return AI_RESPONSES.mentor;
    if(q.includes('next') || q.includes('recommend')) return AI_RESPONSES.next;
    if(q.includes('help') || q.includes('can you')) return AI_RESPONSES.help;
    return AI_RESPONSES.default;
  }

  return {EMPLOYEES, ACTIVITIES, AI_TIPS, simulateIDP, getAIResponse};
})();

// Employee page logic
if (document.getElementById('radarEmployee')){
  const emp = SHARED.EMPLOYEES[0];
  document.getElementById('emp-name').textContent = emp.name;
  document.getElementById('emp-target').textContent = emp.target;
  document.getElementById('readiness').textContent = emp.readiness + '%';

  // Set last login time
  const now = new Date();
  document.getElementById('last-login').textContent = `Today at ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

  // Radar chart with smooth animation
  const ctx = document.getElementById('radarEmployee').getContext('2d');
  new Chart(ctx,{
    type:'radar',
    data:{
      labels:['Leadership','Strategic Thinking','Communication','Technical Skills','Team Management'],
      datasets:[
        {label:'Current',data:[7,6,8,7,6],backgroundColor:'rgba(59,130,246,0.2)',borderColor:'#3B82F6',borderWidth:2,pointBackgroundColor:'#3B82F6',pointBorderWidth:2,pointRadius:4},
        {label:'Target',data:[9,9,8,8,9],backgroundColor:'rgba(79,70,229,0.15)',borderColor:'#4F46E5',borderWidth:2,pointBackgroundColor:'#4F46E5',pointBorderWidth:2,pointRadius:4,borderDash:[5,5]}
      ]
    },
    options:{
      responsive:true,
      animation:{duration:2000,easing:'easeInOutQuart'},
      scales:{r:{beginAtZero:true,max:10,ticks:{stepSize:2}}},
      plugins:{
        legend:{display:true,position:'bottom'},
        tooltip:{
          callbacks:{
            label:function(context){
              return context.dataset.label + ': ' + context.parsed.r + '/10';
            }
          }
        }
      }
    }
  });

  const idp = SHARED.simulateIDP(emp);
  const tbody = document.getElementById('rec-table');
  idp.recs.forEach((r,i)=>{
    const tr = document.createElement('tr');
    tr.className = 'border-b hover:bg-gray-50 transition';
    tr.innerHTML = `
      <td class="py-3">
        <div class="font-semibold">${r.title}</div>
        <div class="text-xs text-gray-500">${r.duration}</div>
      </td>
      <td class="py-3">
        <span class="px-2 py-1 rounded-full text-xs font-semibold ${r.type==='Training'?'bg-blue-100 text-blue-700':r.type==='Rotation'?'bg-yellow-100 text-yellow-700':r.type==='Mentorship'?'bg-purple-100 text-purple-700':'bg-green-100 text-green-700'}">
          ${r.type}
        </span>
      </td>
      <td class="py-3 font-semibold text-green-700">+${r.predictedImpact} pts</td>
      <td class="py-3">
        <span class="px-2 py-1 rounded-full text-xs font-semibold ${r.status==='In Progress'?'bg-indigo-100 text-indigo-700':r.status==='Planned'?'bg-gray-100 text-gray-700':'bg-orange-100 text-orange-700'}">
          ${r.status}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
    // Stagger animation
    setTimeout(()=>tr.classList.add('slide-up'),i*100);
  });

  const timeline = document.getElementById('timeline');
  idp.timeline.forEach((t,i)=>{
    const d = document.createElement('div'); 
    d.className='p-3 rounded-lg border-l-4 transition hover:shadow-md ' + (t.status==='completed'?'bg-green-50 border-green-500':'bg-blue-50 border-blue-500');
    d.innerHTML = `
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5 flex-shrink-0 ${t.status==='completed'?'text-green-600':'text-blue-600'}" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="${t.status==='completed'?'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z':'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'}" clip-rule="evenodd"></path>
        </svg>
        <div class="flex-1">
          <div class="text-xs text-gray-500">${t.date}</div>
          <div class="font-medium text-sm">${t.text}</div>
        </div>
      </div>
    `;
    timeline.appendChild(d);
    setTimeout(()=>d.classList.add('slide-up'),i*150);
  });

  // AI Coach functions
  window.getNewAITip = function(){
    const tips = SHARED.AI_TIPS;
    const newTip = tips[Math.floor(Math.random()*tips.length)];
    const msgEl = document.getElementById('ai-message');
    msgEl.classList.add('ai-typing');
    setTimeout(()=>{
      msgEl.textContent = newTip;
      msgEl.classList.remove('ai-typing');
    },1000);
  };

  window.openAIChat = function(){
    document.getElementById('ai-chat-modal').classList.remove('hidden');
    const messagesDiv = document.getElementById('chat-messages');
    if(messagesDiv.children.length === 0){
      addAIMessage("Hello! I'm your AI Leadership Coach. I can help you understand your development plan, track progress, and answer questions. How can I assist you today?");
    }
  };

  window.closeAIChat = function(){
    document.getElementById('ai-chat-modal').classList.add('hidden');
  };

  function addUserMessage(text){
    const messagesDiv = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'flex justify-end slide-up';
    msgDiv.innerHTML = `<div class="bg-indigo-600 text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-md">${text}</div>`;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function addAIMessage(text){
    const messagesDiv = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'flex justify-start slide-up';
    msgDiv.innerHTML = `
      <div class="flex gap-2 max-w-md">
        <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
        </div>
        <div class="bg-gray-100 px-4 py-2 rounded-2xl rounded-tl-none">${text}</div>
      </div>
    `;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  document.getElementById('chat-form').addEventListener('submit',function(e){
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const query = input.value.trim();
    if(!query) return;
    
    addUserMessage(query);
    input.value = '';
    
    // Simulate AI thinking
    setTimeout(()=>{
      const response = SHARED.getAIResponse(query);
      addAIMessage(response);
    },800);
  });

  document.getElementById('request-checkin').addEventListener('click', ()=>{
    const btn = document.getElementById('request-checkin');
    btn.innerHTML = '<svg class="animate-spin h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';
    setTimeout(()=>{
      btn.textContent = '✓ Request Sent';
      btn.classList.add('bg-green-600','hover:bg-green-700');
      btn.disabled = true;
      showToast('Check-in request sent to Mr. K. Sharma');
    },1000);
  });

  document.getElementById('download-idp').addEventListener('click', ()=>{
    const btn = document.getElementById('download-idp');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<svg class="animate-spin h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Generating...';
    
    setTimeout(()=>{
      const content = `INDIVIDUAL DEVELOPMENT PLAN\n\nEmployee: ${emp.name}\nCurrent Role: ${emp.role}\nTarget Role: ${emp.target}\nReadiness Score: ${emp.readiness}%\n\n--- RECOMMENDED ACTIVITIES ---\n\n` + idp.recs.map((r,i)=>`${i+1}. ${r.title}\n   Type: ${r.type}\n   Duration: ${r.duration}\n   Predicted Impact: +${r.predictedImpact} points\n   Status: ${r.status}\n   Deadline: ${r.deadline}\n`).join('\n');
      
      const blob = new Blob([content],{type:'text/plain'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); 
      a.href=url; 
      a.download = `${emp.name.replace(/\s/g,'_')}_IDP_${new Date().toISOString().split('T')[0]}.txt`; 
      a.click(); 
      URL.revokeObjectURL(url);
      
      btn.innerHTML = originalHTML;
      showToast('IDP downloaded successfully!');
    },1500);
  });

  function showToast(message){
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-2xl z-50 slide-up';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(),3000);
  }
}

// Admin page logic
if (document.getElementById('ninebox')){
  const container = document.getElementById('ninebox');
  SHARED.EMPLOYEES.forEach((e,i)=>{
    const div = document.createElement('div'); 
    div.className='p-4 border-2 rounded-xl text-center transition hover:shadow-lg hover:scale-105 cursor-pointer slide-up';
    div.style.animationDelay = `${i*0.1}s`;
    const bgColor = e.readiness >= 80 ? 'bg-green-50 border-green-300 hover:border-green-500' : 
                    e.readiness >= 60 ? 'bg-yellow-50 border-yellow-300 hover:border-yellow-500' : 
                    'bg-red-50 border-red-300 hover:border-red-500';
    div.classList.add(bgColor);
    div.innerHTML = `
      <div class="w-12 h-12 mx-auto mb-2 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
        ${e.name.split(' ').map(n=>n[0]).join('')}
      </div>
      <div class="font-semibold text-sm">${e.name.split(' ')[0]}</div>
      <div class="text-xs text-gray-500 mt-1">${e.role.split(',')[0]}</div>
      <div class="text-sm mt-2 font-bold ${e.readiness>=80?'text-green-600':e.readiness>=60?'text-yellow-600':'text-red-600'}">${e.readiness}%</div>
      <div class="text-xs text-gray-400">Readiness</div>
    `;
    div.addEventListener('click', ()=>{
      showToastAdmin(`Viewing detailed profile for ${e.name}...`);
      setTimeout(()=>window.location.href = `employee.html?id=${e.id}`,1000);
    });
    container.appendChild(div);
  });

  // Heatmap: enhanced bar chart with gradients
  const heatCtx = document.getElementById('heatmap').getContext('2d');
  new Chart(heatCtx,{
    type:'bar',
    data:{
      labels:SHARED.EMPLOYEES.map(e=>e.name),
      datasets:[{
        label:'Competency Gap (100 - readiness)',
        data:SHARED.EMPLOYEES.map(e=>100-e.readiness),
        backgroundColor:SHARED.EMPLOYEES.map(e=>{
          const gap = 100-e.readiness;
          return gap > 40 ? '#EF4444' : gap > 20 ? '#F59E0B' : '#10B981';
        }),
        borderRadius:8,
        borderWidth:0
      }]
    },
    options:{
      indexAxis:'y',
      responsive:true,
      animation:{duration:1500,easing:'easeInOutQuart'},
      scales:{
        x:{
          beginAtZero:true,
          grid:{display:false},
          ticks:{color:'#6B7280'}
        },
        y:{
          grid:{display:false},
          ticks:{color:'#374151',font:{weight:'600'}}
        }
      },
      plugins:{
        legend:{display:false},
        tooltip:{
          backgroundColor:'rgba(0,0,0,0.8)',
          padding:12,
          titleColor:'#fff',
          bodyColor:'#fff',
          callbacks:{
            label:function(context){
              return `Gap: ${context.parsed.x} points`;
            }
          }
        }
      }
    }
  });

  // Fill admin table with enhanced styling
  const tbody = document.querySelector('#admin-table tbody');
  SHARED.EMPLOYEES.forEach((e,i)=>{
    const tr = document.createElement('tr'); 
    tr.className='border-b hover:bg-gray-50 transition slide-up';
    tr.style.animationDelay = `${i*0.1}s`;
    tr.innerHTML = `
      <td class="p-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
            ${e.name.split(' ').map(n=>n[0]).join('')}
          </div>
          <div>
            <div class="font-semibold">${e.name}</div>
            <div class="text-xs text-gray-500">ID: EMP${String(e.id).padStart(3,'0')}</div>
          </div>
        </div>
      </td>
      <td class="p-3">
        <div class="font-medium">${e.role}</div>
        <div class="text-xs text-gray-500">Target: ${e.target}</div>
      </td>
      <td class="p-3">
        <span class="px-2 py-1 rounded-full text-xs font-semibold ${e.performance>=4&&e.potential>=4?'bg-green-100 text-green-700':'bg-gray-100 text-gray-700'}">
          ${e.performance}/${e.potential}
        </span>
      </td>
      <td class="p-3">
        <div class="flex items-center gap-2">
          <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full ${e.readiness>=80?'bg-green-500':e.readiness>=60?'bg-yellow-500':'bg-red-500'} transition-all" style="width: ${e.readiness}%"></div>
          </div>
          <span class="font-bold text-sm ${e.readiness>=80?'text-green-600':e.readiness>=60?'text-yellow-600':'text-red-600'}">${e.readiness}%</span>
        </div>
      </td>
      <td class="p-3">
        <button onclick="viewEmployeeAdmin(${e.id})" class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition text-xs font-semibold">
          View IDP
        </button>
      </td>
    `; 
    tbody.appendChild(tr);
  });

  // Search filter
  document.getElementById('admin-search').addEventListener('input', (evt)=>{
    const q = evt.target.value.toLowerCase(); 
    document.querySelectorAll('#admin-table tbody tr').forEach(row=>{
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none'
    });
  });

  // Global admin functions
  window.viewEmployeeAdmin = function(id){
    showToastAdmin(`Loading IDP for Employee ${id}...`);
    setTimeout(()=>window.location.href = `employee.html?id=${id}`,800);
  };

  function showToastAdmin(message){
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-2xl z-50 slide-up';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(),3000);
  }
  
  // Animate KPI counters
  function animateCounter(id, target){
    const el = document.getElementById(id);
    const suffix = target.includes('%') ? '%' : '';
    const num = parseInt(target);
    let current = 0;
    const increment = num / 50;
    const timer = setInterval(()=>{
      current += increment;
      if(current >= num){
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    },20);
  }
  
  setTimeout(()=>{
    animateCounter('kpi-readiness','72%');
    animateCounter('kpi-idps','12');
    animateCounter('kpi-gap','18');
  },300);
}
