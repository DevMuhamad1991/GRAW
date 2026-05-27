(function() {
 const style = document.createElement('style');
 style.textContent = `
   #graw-back-btn {
     position: fixed;
     top: 18px;
     left: 18px;
     z-index: 9999;
     width: 46px;
     height: 46px;
     border-radius: 14px;
     background: rgba(0,0,0,0.55);
     backdrop-filter: blur(10px);
     border: 1.5px solid rgba(255,255,255,0.15);
     display: flex;
     align-items: center;
     justify-content: center;
     cursor: pointer;
     box-shadow: 0 4px 18px rgba(0,0,0,0.25);
     transition: transform 0.18s, background 0.18s;
   }
   #graw-back-btn:hover {
     background: rgba(0,0,0,0.75);
     transform: scale(1.08);
   }
   #graw-back-btn svg {
     width: 22px;
     height: 22px;
   }
   #graw-confirm {
     position: fixed;
     inset: 0;
     z-index: 99999;
     display: flex;
     align-items: flex-end;
     justify-content: center;
     opacity: 0;
     pointer-events: none;
     transition: opacity 0.25s;
   }
   #graw-confirm.show {
     opacity: 1;
     pointer-events: all;
   }
   #graw-confirm-overlay {
     position: absolute;
     inset: 0;
     background: rgba(0,0,0,0.45);
     backdrop-filter: blur(6px);
   }
   #graw-confirm-card {
     position: relative;
     z-index: 2;
     background: #1A1A1A;
     border-radius: 28px 28px 0 0;
     padding: 32px 24px 42px;
     width: 100%;
     max-width: 480px;
     text-align: center;
     direction: rtl;
     transform: translateY(40px);
     transition: transform 0.28s cubic-bezier(0.34,1.4,0.64,1);
     border-top: 1.5px solid rgba(255,255,255,0.08);
   }
   #graw-confirm.show #graw-confirm-card {
     transform: translateY(0);
   }
   #graw-confirm-icon {
     width: 58px;
     height: 58px;
     border-radius: 18px;
     background: rgba(255,59,48,0.12);
     border: 1.5px solid rgba(255,59,48,0.25);
     display: flex;
     align-items: center;
     justify-content: center;
     margin: 0 auto 16px;
     animation: shake 0.5s ease 0.3s both;
   }
   #graw-confirm-icon svg {
     width: 28px;
     height: 28px;
   }
   @keyframes shake {
     0%,100% { transform: rotate(0deg); }
     25% { transform: rotate(-12deg); }
     75% { transform: rotate(12deg); }
   }
   #graw-confirm-title {
     font-size: 20px;
     font-weight: 900;
     color: #fff;
     margin-bottom: 8px;
     font-family: 'Noto Kufi Arabic', 'Cairo', sans-serif;
   }
   #graw-confirm-desc {
     font-size: 13px;
     color: #888;
     margin-bottom: 28px;
     line-height: 1.7;
     font-family: 'Noto Kufi Arabic', 'Cairo', sans-serif;
   }
   #graw-confirm-desc span {
     color: #FF5555;
     font-weight: 700;
   }
   .graw-confirm-btns {
     display: flex;
     gap: 12px;
   }
   .graw-btn-cancel {
     flex: 1;
     padding: 15px;
     border-radius: 16px;
     border: none;
     background: #2A2A2A;
     color: #4CD964;
     font-family: 'Noto Kufi Arabic', 'Cairo', sans-serif;
     font-size: 15px;
     font-weight: 800;
     cursor: pointer;
     display: flex;
     align-items: center;
     justify-content: center;
     gap: 8px;
     transition: background 0.18s, transform 0.15s;
   }
   .graw-btn-cancel:hover {
     background: #333;
     transform: translateY(-2px);
   }
   .graw-btn-cancel svg { width: 18px; height: 18px; }
   .graw-btn-leave {
     flex: 1;
     padding: 15px;
     border-radius: 16px;
     border: none;
     background: linear-gradient(135deg, #FF3B30, #CC1A10);
     color: #fff;
     font-family: 'Noto Kufi Arabic', 'Cairo', sans-serif;
     font-size: 15px;
     font-weight: 800;
     cursor: pointer;
     display: flex;
     align-items: center;
     justify-content: center;
     gap: 8px;
     box-shadow: 0 4px 16px rgba(255,59,48,0.35);
     transition: opacity 0.18s, transform 0.15s;
   }
   .graw-btn-leave:hover {
     opacity: 0.88;
     transform: translateY(-2px);
   }
   .graw-btn-leave svg { width: 18px; height: 18px; }
 `;
 document.head.appendChild(style);

 const btn = document.createElement('button');
 btn.id = 'graw-back-btn';
 btn.innerHTML = `
   <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
     <path d="M19 12H5"/>
     <path d="M12 19l-7-7 7-7"/>
   </svg>
 `;
 document.body.appendChild(btn);

 const modal = document.createElement('div');
 modal.id = 'graw-confirm';
 modal.innerHTML = `
   <div id="graw-confirm-overlay"></div>
   <div id="graw-confirm-card">
     <div id="graw-confirm-icon">
       <svg viewBox="0 0 24 24" fill="none" stroke="#FF3B30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
         <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
         <polyline points="16 17 21 12 16 7"/>
         <line x1="21" y1="12" x2="9" y2="12"/>
       </svg>
     </div>
     <div id="graw-confirm-title">جێهێشتنی یاری؟</div>
     <div id="graw-confirm-desc">
       ئەگەر بچیتە دەرەوە<br/>
       <span>هەموو خەڵەکانت لە دەست دەچێت!</span>
     </div>
     <div class="graw-confirm-btns">
       <button class="graw-btn-cancel" id="graw-stay">
         <svg viewBox="0 0 24 24" fill="none" stroke="#4CD964" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
           <polyline points="20 6 9 17 4 12"/>
         </svg>
         گەڕانەوە
       </button>
       <button class="graw-btn-leave" id="graw-leave">
         <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
           <polyline points="16 17 21 12 16 7"/>
           <line x1="21" y1="12" x2="9" y2="12"/>
         </svg>
         جێهێشتن
       </button>
     </div>
   </div>
 `;
 document.body.appendChild(modal);

 btn.addEventListener('click', () => {
   modal.classList.add('show');
 });

 document.getElementById('graw-confirm-overlay').addEventListener('click', () => {
   modal.classList.remove('show');
 });

 document.getElementById('graw-stay').addEventListener('click', () => {
   modal.classList.remove('show');
 });

 document.getElementById('graw-leave').addEventListener('click', () => {
   window.history.back();
 });
})();
