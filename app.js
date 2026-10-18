const opportunities=[
 {title:'مصمّم/ة واجهات وتجربة مستخدم',company:'نواة الرقمية',logo:'ن',color:'#e8f1e8',ink:'#41744f',type:'project',typeLabel:'مشروع قصير',field:'design',location:'عن بُعد',duration:'٣ أسابيع',pay:'مكافأة رمزية',tags:['Figma','UI/UX']},
 {title:'متدرّب/ة تطوير واجهات أمامية',company:'مدار للتقنية',logo:'⌘',color:'#e9eef7',ink:'#667cac',type:'internship',typeLabel:'تدريب',field:'tech',location:'دمشق',duration:'شهران',pay:'مدفوع',tags:['React','JavaScript']},
 {title:'إعداد خطة محتوى لمنصة ناشئة',company:'مساحة',logo:'م',color:'#f7e9df',ink:'#b57a52',type:'project',typeLabel:'مشروع قصير',field:'marketing',location:'عن بُعد',duration:'أسبوعان',pay:'شهادة خبرة',tags:['كتابة','سوشال ميديا']},
 {title:'مساعد/ة تحليل بيانات',company:'نقطة للاستشارات',logo:'ن',color:'#eeebf6',ink:'#8070a5',type:'internship',typeLabel:'تدريب',field:'business',location:'حلب',duration:'٦ أسابيع',pay:'بدل مواصلات',tags:['Excel','تحليل']},
 {title:'تصميم هوية بصرية لمقهى محلي',company:'بيت البن',logo:'ب',color:'#f3eadc',ink:'#9c7247',type:'project',typeLabel:'مشروع قصير',field:'design',location:'دمشق',duration:'١٠ أيام',pay:'مكافأة رمزية',tags:['Branding','Illustrator']},
 {title:'مساعد/ة تطوير تطبيق موبايل',company:'فلك للحلول',logo:'ف',color:'#e6eff1',ink:'#4b8290',type:'internship',typeLabel:'تدريب',field:'tech',location:'عن بُعد',duration:'شهر',pay:'مدفوع',tags:['Flutter','Git']}
];
const grid=document.querySelector('#jobGrid'),search=document.querySelector('#searchInput'),typeFilter=document.querySelector('#typeFilter'),fieldFilter=document.querySelector('#fieldFilter'),empty=document.querySelector('#emptyState'),toast=document.querySelector('#toast');
function renderJobs(){const q=search.value.trim().toLowerCase(),type=typeFilter.value,field=fieldFilter.value;const results=opportunities.filter(j=>(type==='all'||j.type===type)&&(field==='all'||j.field===field)&&`${j.title} ${j.company} ${j.tags.join(' ')}`.toLowerCase().includes(q));grid.innerHTML=results.map((j,i)=>`<article class="job-card"><div class="job-top"><span class="company-logo" style="background:${j.color};color:${j.ink}">${j.logo}</span><button class="save-btn" aria-label="حفظ الفرصة" data-save="${i}">♡</button></div><h3>${j.title}</h3><div class="company-name">${j.company} <span class="verified-label">· ✓ شركة مشاركة</span></div><div class="job-meta"><span class="location">${j.location}</span><span class="duration">${j.duration}</span><span class="pay">${j.pay}</span></div><div class="job-foot"><span class="tag">${j.typeLabel}</span><button class="job-apply" data-apply="${i}">التفاصيل والتقديم ←</button></div></article>`).join('');empty.hidden=results.length>0;grid.hidden=results.length===0;grid.querySelectorAll('[data-save]').forEach(b=>b.addEventListener('click',()=>{b.classList.toggle('saved');b.textContent=b.classList.contains('saved')?'♥':'♡';showToast(b.classList.contains('saved')?'تم حفظ الفرصة في قائمتك':'أزيلت الفرصة من قائمتك')}));grid.querySelectorAll('[data-apply]').forEach(b=>b.addEventListener('click',()=>openOpportunity(results[Number(b.dataset.apply)])));}
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('show'),2500)}
search.addEventListener('input',renderJobs);typeFilter.addEventListener('change',renderJobs);fieldFilter.addEventListener('change',renderJobs);renderJobs();
const modal=document.querySelector('#modal'),content=document.querySelector('#modalContent');function showModal(html){content.innerHTML=html;modal.showModal();content.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();modal.close();showToast('وصلتنا بياناتك التجريبية — سنضيف التسجيل الفعلي في المرحلة التالية')}))}
function openOpportunity(job){showModal(`<div class="modal-content"><div class="modal-logo">${job.logo}</div><span class="verified-label">${job.typeLabel} · ${job.company}</span><h2>${job.title}</h2><p>فرصة عملية للطلاب لبناء خبرة حقيقية ضمن بيئة داعمة. ستتواصل الشركة مع المرشحين المناسبين بعد مراجعة الملف.</p><div class="modal-tags">${job.tags.map(t=>`<span>${t}</span>`).join('')}<span>${job.duration}</span></div><form class="modal-form"><input required placeholder="اسمك الكامل" /><input required type="email" placeholder="البريد الإلكتروني" /><textarea placeholder="رسالة قصيرة للشركة (اختياري)"></textarea><button class="button primary">إرسال طلب التقديم <span>←</span></button></form><small style="display:block;color:#929c93;margin-top:12px">نموذج عرض: لن يُرسل الطلب إلى شركة فعلياً بعد.</small></div>`)}
document.querySelector('.modal-close').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
document.querySelector('#viewToggle').addEventListener('click',e=>{
 const button=e.currentTarget;
 const isStudentView=button.textContent.includes('الشركات');
 if(isStudentView){
   button.textContent='منظور الطالب';
   document.querySelector('main').innerHTML=`
   <section class="shell section company-dashboard-page">
    <div class="eyebrow">مساحة الشركاء</div><h1 style="font-size:clamp(36px,5vw,54px);letter-spacing:0;margin:18px 0 10px">لوحة تحكم <em>الشركات</em></h1>
    <p style="color:#758078;line-height:1.8;max-width:680px">أدر فرصك، وتابع طلبات الطلاب، واكتشف المواهب المناسبة لفريقك. هذه لوحة توضيحية لعرض فكرة المنصة.</p>
    <div class="company-stats" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin:28px 0">
     <div style="background:white;border:1px solid #e7ebe6;border-radius:16px;padding:22px"><strong style="font-size:30px;color:#285744;display:block">٢</strong><span>فرص منشورة تجريبياً</span></div>
     <div style="background:white;border:1px solid #e7ebe6;border-radius:16px;padding:22px"><strong style="font-size:30px;color:#285744;display:block">٨</strong><span>طلبات تجريبية</span></div>
     <div style="background:white;border:1px solid #e7ebe6;border-radius:16px;padding:22px"><strong style="font-size:30px;color:#285744;display:block">٣</strong><span>ملفات مرشحين تجريبية</span></div>
    </div>
    <div style="margin:38px 0 18px"><div class="eyebrow">اكتشف المواهب</div><h2 style="font-size:28px;margin:10px 0">مواهب الطلاب</h2><p style="color:#758078">تصفّح ملفات طلاب افتراضية بحسب تخصصاتهم ومهاراتهم، واكتشف من يناسب فرص شركتك.</p></div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px">
      <input id="studentSearch" type="search" placeholder="ابحث باسم الطالب أو المهارة أو التخصص..." style="flex:1;min-width:220px;border:1px solid #e7ebe6;border-radius:11px;padding:12px 14px;background:white;font:inherit" />
      <select id="studentField" style="border:1px solid #e7ebe6;border-radius:11px;padding:12px;background:white;font:inherit"><option value="all">كل التخصصات</option><option value="tech">هندسة معلوماتية وتقنية</option><option value="design">تصميم</option><option value="business">إدارة وأعمال</option><option value="marketing">تسويق</option></select>
    </div>
    <div id="studentTalentGrid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:16px">
      <article data-student-card data-field="tech" data-search="محمد خالد هندسة معلوماتية javascript react python git مطور واجهات" class="job-card"><div style="display:flex;align-items:center;gap:12px"><span class="company-logo" style="background:#e7efe6;color:#285744">م</span><div><h3 style="margin:0 0 4px">محمد خالد</h3><span class="company-name">هندسة معلوماتية · السنة الثالثة</span></div></div><p style="color:#758078;font-size:13px;line-height:1.8;margin-top:16px">مهتم بتطوير الويب وبناء واجهات سهلة الاستخدام.</p><div class="skill-row"><span>JavaScript</span><span>React</span><span>Python</span></div><button class="job-apply student-profile-button" style="align-self:flex-start;margin-top:18px" data-student="محمد خالد">عرض الملف والتواصل ←</button></article>
      <article data-student-card data-field="design" data-search="سارة أحمد تصميم ux ui figma بحث المستخدم نماذج أولية" class="job-card"><div style="display:flex;align-items:center;gap:12px"><span class="company-logo" style="background:#f7e9df;color:#b57a52">س</span><div><h3 style="margin:0 0 4px">سارة أحمد</h3><span class="company-name">تصميم تجربة المستخدم · السنة الرابعة</span></div></div><p style="color:#758078;font-size:13px;line-height:1.8;margin-top:16px">تهتم بتصميم تجارب رقمية واضحة وإجراء أبحاث المستخدمين.</p><div class="skill-row"><span>Figma</span><span>UI/UX</span><span>Prototyping</span></div><button class="job-apply student-profile-button" style="align-self:flex-start;margin-top:18px" data-student="سارة أحمد">عرض الملف والتواصل ←</button></article>
      <article data-student-card data-field="marketing" data-search="ليان عمر تسويق محتوى سوشال ميديا كتابة تحليل" class="job-card"><div style="display:flex;align-items:center;gap:12px"><span class="company-logo" style="background:#e9eef7;color:#667cac">ل</span><div><h3 style="margin:0 0 4px">ليان عمر</h3><span class="company-name">تسويق رقمي · السنة الثانية</span></div></div><p style="color:#758078;font-size:13px;line-height:1.8;margin-top:16px">مهتمة بصناعة المحتوى وتخطيط الحملات الرقمية.</p><div class="skill-row"><span>كتابة المحتوى</span><span>Social Media</span><span>Analytics</span></div><button class="job-apply student-profile-button" style="align-self:flex-start;margin-top:18px" data-student="ليان عمر">عرض الملف والتواصل ←</button></article>
      <article data-student-card data-field="business" data-search="عمر حسن إدارة أعمال excel تحليل بيانات تنظيم مشاريع" class="job-card"><div style="display:flex;align-items:center;gap:12px"><span class="company-logo" style="background:#eeebf6;color:#8070a5">ع</span><div><h3 style="margin:0 0 4px">عمر حسن</h3><span class="company-name">إدارة أعمال · السنة الثالثة</span></div></div><p style="color:#758078;font-size:13px;line-height:1.8;margin-top:16px">مهتم بتحليل البيانات وتنظيم المشاريع والعمل ضمن فريق.</p><div class="skill-row"><span>Excel</span><span>تحليل بيانات</span><span>تنظيم مشاريع</span></div><button class="job-apply student-profile-button" style="align-self:flex-start;margin-top:18px" data-student="عمر حسن">عرض الملف والتواصل ←</button></article>
    </div>
    <p id="noStudentsFound" hidden style="padding:22px;color:#758078">ما لقينا طلاب مطابقين للبحث.</p>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin:34px 0 18px"><div><h2 style="font-size:28px">فرصك الحالية</h2><p style="color:#758078">تابع الفرص التي تعرضها شركتك.</p></div><button class="button primary" id="dashboardPublish">＋ نشر فرصة جديدة</button></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px">
     <article class="job-card"><span class="tag" style="align-self:start">نشطة · تدريب</span><h3>متدرّب تطوير واجهات أمامية</h3><div class="company-name">مدار للتقنية</div><div class="job-meta"><span>شهران</span><span>دمشق</span></div><p style="color:#758078;font-size:13px;line-height:1.7">المهارات: React، JavaScript، Git</p></article>
     <article class="job-card"><span class="tag" style="align-self:start">نشطة · مشروع قصير</span><h3>مصمّم تجربة مستخدم</h3><div class="company-name">نواة الرقمية</div><div class="job-meta"><span>٣ أسابيع</span><span>عن بُعد</span></div><p style="color:#758078;font-size:13px;line-height:1.7">المهارات: Figma، UI/UX، النماذج الأولية</p></article>
    </div>
    <p style="margin-top:28px;color:#929c93;font-size:13px">تنبيه: كل الإحصائيات والفرص هنا تجريبية، والنشر لا يحفظ بيانات على خادم حتى الآن.</p>
   </section>`;
   const studentSearch=document.querySelector('#studentSearch');
   const studentField=document.querySelector('#studentField');
   const studentCards=[...document.querySelectorAll('[data-student-card]')];
   function filterStudents(){
     const q=studentSearch.value.trim().toLowerCase();
     let count=0;
     studentCards.forEach(card=>{
       const matchesText=card.dataset.search.toLowerCase().includes(q);
       const matchesField=studentField.value==='all'||card.dataset.field===studentField.value;
       card.hidden=!(matchesText&&matchesField);
       if(!card.hidden)count++;
     });
     document.querySelector('#noStudentsFound').hidden=count>0;
   }
   studentSearch.addEventListener('input',filterStudents);
   studentField.addEventListener('change',filterStudents);
   document.querySelectorAll('[data-student]').forEach(button=>button.addEventListener('click',()=>{
     const name=button.dataset.student;
     const card=button.closest('[data-student-card]');
     showModal(`<div class="modal-content"><div class="modal-logo">${name==='محمد خالد'?'م':name==='سارة أحمد'?'س':'ل'}</div><span class="verified-label">ملف طالب تجريبي</span><h2>${name}</h2><p>${card.querySelector('.company-name').textContent}</p><p>${card.querySelector('p').textContent}</p><div class="modal-tags">${[...card.querySelectorAll('.skill-row span')].map(s=>'<span>'+s.textContent+'</span>').join('')}</div><form class="modal-form"><input required placeholder="اسم ممثل الشركة" /><input required type="email" placeholder="بريد الشركة للتواصل" /><textarea placeholder="رسالة للطالب (اختياري)"></textarea><button class="button primary">معاينة رسالة التواصل ←</button></form><small style="display:block;color:#929c93;margin-top:12px">بيانات الطالب تجريبية؛ لا يتم إرسال الرسالة فعلياً.</small></div>`);
   }));
   document.querySelector('#dashboardPublish').addEventListener('click',()=>showModal(`<div class="modal-content"><div class="modal-logo">✳</div><h2>نشر فرصة جديدة</h2><p>املأ التفاصيل لتجربة واجهة النشر.</p><form class="modal-form"><input required placeholder="اسم الشركة" /><input required type="email" placeholder="بريد التواصل" /><input required placeholder="عنوان الفرصة" /><select required><option value="">نوع الفرصة</option><option>تدريب</option><option>مشروع قصير</option></select><textarea required placeholder="وصف الفرصة والمهارات المطلوبة"></textarea><button class="button primary">إرسال النموذج التجريبي ←</button></form><small style="display:block;color:#929c93;margin-top:12px">لن تُحفظ البيانات أو تُنشر للعامة حالياً.</small></div>`));
   window.scrollTo({top:0,behavior:'smooth'});
 }else{
   button.textContent='منظور الشركات';
   window.location.reload();
 }
});
document.querySelector('#companyButton').addEventListener('click',()=>showModal(`<div class="modal-content"><div class="modal-logo">✳</div><h2>انشر فرصة لطلاب الجامعات</h2><p>عرّفنا بشركتك وبالفرصة التي تريد طرحها. هذا النموذج تجريبي وسيُربط بلوحة الشركات عند تجهيز الإطلاق.</p><form class="modal-form"><input required placeholder="اسم الشركة" /><input required type="email" placeholder="بريد التواصل" /><input required placeholder="عنوان الفرصة" /><textarea required placeholder="وصف مختصر والمهارات المطلوبة"></textarea><button class="button primary">إرسال تفاصيل الفرصة <span>←</span></button></form></div>`));
document.querySelector('#profileButton').addEventListener('click',()=>document.querySelector('#profile').scrollIntoView({behavior:'smooth'}));
document.querySelector('.avatar').addEventListener('click',()=>showToast('حساب الطالب التجريبي'));
document.querySelector('.menu-button').addEventListener('click',()=>document.querySelector('.main-nav').classList.toggle('open'));document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.main-nav').classList.remove('open')));
