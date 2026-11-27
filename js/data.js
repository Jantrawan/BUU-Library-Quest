/* =========================================================================
 * DEFAULT STAGES, 40 AUTHENTIC LIBRARY QUESTIONS & LOCALSTORAGE MANAGER
 * ========================================================================= */
const STORAGE_KEYS = {
  STAGES: 'buu_lq_stages_v1',
  QUESTIONS: 'buu_lq_questions_v1',
  LEADERBOARD: 'buu_lq_leaderboard_v1',
  SETTINGS: 'buu_lq_settings_v1',
  SESSION: 'buu_lq_active_session_v1'
};

const DEFAULT_STAGES = [
  { id: 'stage_1', name: 'OPAC Detective นักสืบค้นสารสนเทศ', theme: 'opac', randomize: false },
  { id: 'stage_2', name: 'Library Explorer นักสำรวจห้องสมุด', theme: 'explorer', randomize: false },
  { id: 'stage_3', name: 'Smart Study Challenge นักคิดพิชิตความรู้', theme: 'haunted', randomize: false },
  { id: 'stage_4', name: 'The Library Master สุดยอดนักพิชิตห้องสมุด', theme: 'master', randomize: false }
];

function createDefaultQuestions() {
  return {
    stage_1: [
      {
        id: 'q1_1', active: true, stars: 10, image: '',
        question: 'ระบบ OPAC ของสำนักหอสมุด มหาวิทยาลัยบูรพา ใช้ทำหน้าที่หลักในข้อใด?',
        options: [
          'สืบค้นรายการทรัพยากรสารสนเทศและตรวจสอบสถานะหนังสือ',
          'จองตั๋วรถโดยสารภายในมหาวิทยาลัย',
          'สั่งอาหารและเครื่องดื่มในโรงอาหาร',
          'ลงทะเบียนเรียนรายวิชาประจำภาคการศึกษา'
        ],
        correctIndex: 0,
        explanation: 'OPAC (Online Public Access Catalog) คือระบบสืบค้นทรัพยากรสารสนเทศออนไลน์ของห้องสมุด เพื่อค้นหาหนังสือ สื่อ และเช็กสถานะว่าพร้อมให้บริการหรือไม่'
      },
      {
        id: 'q1_2', active: true, stars: 10, image: '',
        question: 'หากต้องการค้นหาหนังสือที่ชื่อเรื่องตรงเป๊ะทุกคำในระบบสืบค้น ควรใช้เครื่องหมายใดครอบคำค้น?',
        options: ['เครื่องหมายคำพูด (" ")', 'เครื่องหมายคำถาม (?)', 'เครื่องหมายอัศเจรีย์ (!)', 'เครื่องหมายดอกจัน (*)'],
        correctIndex: 0,
        explanation: 'การใช้เครื่องหมายคำพูด ("...") เป็นการค้นหาแบบวลีตรงตัว (Phrase Searching) ช่วยให้ได้ผลลัพธ์ที่แม่นยำยิ่งขึ้น'
      },
      {
        id: 'q1_3', active: true, stars: 10, image: '',
        question: 'เลขเรียกหนังสือ (Call Number) ในหน้าจอ OPAC มีประโยชน์อย่างไรสำคัญที่สุด?',
        options: [
          'บอกตำแหน่งที่ตั้งของหนังสือบนชั้นหนังสือ',
          'บอกราคาขายของหนังสือเล่มนั้น',
          'บอกจำนวนหน้าทั้งหมดของหนังสือ',
          'บอกปีเกิดของผู้แต่งหนังสือ'
        ],
        correctIndex: 0,
        explanation: 'เลขเรียกหนังสือ (Call Number) เปรียบเสมือนที่อยู่ของหนังสือบนชั้น ช่วยให้ผู้ใช้เดินไปหยิบหนังสือได้ถูกต้อง'
      },
      {
        id: 'q1_4', active: true, stars: 10, image: '',
        question: 'ตรรกบูลีน (Boolean Operators) คำว่า "AND" ใช้เพื่อวัตถุประสงค์ใดในการสืบค้น?',
        options: [
          'จำกัดขอบเขตให้แคบลง โดยต้องพบทั้งสองคำในผลลัพธ์',
          'ขยายขอบเขตให้กว้างขึ้น โดยพบคำใดคำหนึ่งก็ได้',
          'ตัดคำที่ไม่ต้องการออกจากผลการสืบค้น',
          'แปลคำค้นจากภาษาไทยเป็นภาษาอังกฤษอัตโนมัติ'
        ],
        correctIndex: 0,
        explanation: 'คำเชื่อม AND จะเชื่อมคำค้นเข้าด้วยกัน ทำให้ผลการค้นหามีเฉพาะรายการที่มีคำค้นครบทุกคำที่ระบุ'
      },
      {
        id: 'q1_5', active: true, stars: 10, image: '',
        question: 'หากสถานะหนังสือในระบบ OPAC แสดงคำว่า "Available" หรือ "พร้อมให้บริการ" หมายความว่าอย่างไร?',
        options: [
          'หนังสืออยู่บนชั้น สามารถไปหยิบยืมได้ทันที',
          'หนังสือถูกสมาชิกท่านอื่นยืมออกไปแล้ว',
          'หนังสือกำลังอยู่ระหว่างซ่อมแซมปก',
          'หนังสือสูญหายไม่สามารถให้บริการได้'
        ],
        correctIndex: 0,
        explanation: 'สถานะ Available หมายถึงหนังสือเล่มนั้นว่างอยู่บนชั้นตามเลขเรียกหนังสือ สามารถนำมายืมได้'
      },
      {
        id: 'q1_6', active: true, stars: 10, image: '',
        question: 'ระบบจัดหมวดหมู่หนังสือที่ใช้ในห้องสมุดระดับอุดมศึกษา (รวมถึง ม.บูรพา) ส่วนใหญ่คือระบบใด?',
        options: [
          'ระบบหอสมุดรัฐสภาอเมริกัน (Library of Congress - LC)',
          'ระบบทศนิยมของดิวอี้ (Dewey Decimal Classification)',
          'ระบบเรียงตามสีของปกหนังสือ',
          'ระบบเรียงตามขนาดความหนาของเล่ม'
        ],
        correctIndex: 0,
        explanation: 'ห้องสมุดมหาวิทยาลัยส่วนใหญ่ใช้ระบบ LC (Library of Congress) ซึ่งขึ้นต้นหมวดหมู่ด้วยตัวอักษรภาษาอังกฤษ A-Z'
      },
      {
        id: 'q1_7', active: true, stars: 10, image: '',
        question: 'เมื่อพบข้อมูลหนังสือในระบบ OPAC แล้ว สิ่งใดบ้างที่ควรจดบันทึกก่อนเดินไปหาหนังสือที่ชั้น?',
        options: [
          'เลขเรียกหนังสือ (Call Number) และสถานที่เก็บ/ชั้น',
          'เลข ISBN และชื่อโรงพิมพ์เท่านั้น',
          'ชื่อบรรณารักษ์ผู้ลงรายการ',
          'ขนาดกว้างคูณยาวของหนังสือ'
        ],
        correctIndex: 0,
        explanation: 'ต้องดูทั้งเลขเรียกหนังสือ (Call Number) และโซน/ชั้นที่จัดเก็บ (Location) เพื่อไปถูกชั้นและถูกหมวดหมู่'
      },
      {
        id: 'q1_8', active: true, stars: 10, image: '',
        question: 'สัญลักษณ์ "*" (Truncation) ท้ายรากศัพท์ภาษาอังกฤษ เช่น "librar*" ในการสืบค้นมีผลอย่างไร?',
        options: [
          'ค้นหาคำที่มีรากศัพท์ขึ้นต้นเหมือนกัน เช่น library, libraries, librarian',
          'ลบคำค้นนั้นออกจากประวัติการค้นหา',
          'ค้นหาเฉพาะหนังสือที่มีภาพประกอบสีเท่านั้น',
          'จัดเรียงผลลัพธ์ตามตัวอักษรจาก Z ไป A'
        ],
        correctIndex: 0,
        explanation: 'เครื่องหมาย * ช่วยละตัวอักษรด้านท้าย ทำให้ค้นพบรูปคำที่ผันแตกต่างกันได้ในการค้นครั้งเดียว'
      },
      {
        id: 'q1_9', active: true, stars: 10, image: '',
        question: 'หากหนังสือที่ต้องการถูกยืมออกไปแล้ว ผู้ใช้สามารถทำรายการใดผ่านระบบสมาชิกห้องสมุดได้?',
        options: [
          'ทำรายการจองหนังสือ (Hold / Reservation)',
          'สั่งพิมพ์หนังสือทั้งเล่มออกมาฟรี',
          'ยกเลิกสิทธิ์การยืมของคนก่อนหน้าทันที',
          'เปลี่ยนสถานะหนังสือเองในระบบ'
        ],
        correctIndex: 0,
        explanation: 'เมื่อหนังสือถูกยืมอยู่ สมาชิกสามารถกดจอง (Hold) ในระบบ เพื่อรับสิทธิ์ยืมเป็นคิวถัดไปเมื่อหนังสือถูกส่งคืน'
      },
      {
        id: 'q1_10', active: true, stars: 10, image: '',
        question: 'ข้อใดคือความหมายของ "ฐานข้อมูลออนไลน์ (Online Databases)" ที่ห้องสมุดบอกรับสมาชิก?',
        options: [
          'แหล่งรวบรวมบทความวารสารวิชาการ งานวิจัย และ E-Books ที่เชื่อถือได้',
          'เว็บไซต์ขายหนังสือมือสองออนไลน์',
          'โปรแกรมแชทพูดคุยทั่วไป',
          'พื้นที่ฝากไฟล์ภาพส่วนตัว'
        ],
        correctIndex: 0,
        explanation: 'ฐานข้อมูลออนไลน์เป็นแหล่งสารสนเทศวิชาการคุณภาพสูงที่ห้องสมุดบอกรับให้นิสิตและบุคลากรเข้าถึงเอกสารฉบับเต็มได้'
      }
    ],
    stage_2: [
      {
        id: 'q2_1', active: true, stars: 10, image: '',
        question: 'ข้อใดเป็นมารยาทที่ดีในการเข้าใช้บริการพื้นที่อ่านหนังสือภายในหอสมุด?',
        options: [
          'ตั้งระบบโทรศัพท์มือถือเป็นระบบสั่นหรือปิดเสียง',
          'เปิดลำโพงดูวิดีโอเสียงดังในโซนเงียบ',
          'นำอาหารกลิ่นแรงเข้ามารับประทานบนโต๊ะอ่านหนังสือ',
          'วางกระเป๋าจองที่นั่งทิ้งไว้ตลอดทั้งวันโดยไม่อยู่ใช้งาน'
        ],
        correctIndex: 0,
        explanation: 'การปิดเสียงโทรศัพท์และงดส่งเสียงดังเป็นการเคารพสิทธิ์และรักษาบรรยากาศการเรียนรู้ของส่วนรวม'
      },
      {
        id: 'q2_2', active: true, stars: 10, image: '',
        question: 'เมื่อหยิบหนังสือออกจากชั้นมาอ่านแล้ว แต่ไม่ต้องการยืมออก ควรทำอย่างไร?',
        options: [
          'วางไว้บนรถเข็นพักหนังสือ หรือจุดที่ห้องสมุดจัดเตรียมไว้',
          'เสียบแทรกไว้ช่องว่างตรงไหนก็ได้บนชั้น',
          'วางทิ้งไว้บนพื้นทางเดิน',
          'นำกลับไปซ่อนไว้หลังตู้หนังสือ'
        ],
        correctIndex: 0,
        explanation: 'การวางหนังสือบนรถเข็นพักหนังสือช่วยให้เจ้าหน้าที่นำไปจัดเรียงขึ้นชั้นตามเลขเรียกหนังสือได้อย่างถูกต้อง ไม่เกิดปัญหาหนังสือหายจากตำแหน่ง'
      },
      {
        id: 'q2_3', active: true, stars: 10, image: '',
        question: 'หากต้องการติวหนังสือหรือประชุมกลุ่มย่อยร่วมกับเพื่อน ควรเลือกใช้พื้นที่โซนใดของห้องสมุด?',
        options: [
          'ห้องศึกษากลุ่ม (Group Study Room) หรือโซนเรียนรู้ร่วมกัน',
          'โซนอ่านหนังสือเงียบ (Silent Zone)',
          'หน้าเคาน์เตอร์ยืม-คืนหนังสือ',
          'บริเวณทางเข้า-ออกประตูตรวจจับสัญญาณ'
        ],
        correctIndex: 0,
        explanation: 'ห้องสมุดแบ่งโซนบริการชัดเจน ควรจองใช้ห้องศึกษากลุ่มหรือโซน Co-Learning Space เมื่อต้องสนทนากัน'
      },
      {
        id: 'q2_4', active: true, stars: 10, image: '',
        question: 'หลักฐานสำคัญที่นิสิตต้องใช้ในการยืมหนังสือหรือเข้าใช้บริการห้องสมุดคือข้อใด?',
        options: [
          'บัตรประจำตัวนิสิต หรือ Digital Student ID ในแอปพลิเคชัน',
          'สำเนาทะเบียนบ้าน',
          'ใบเสร็จค่าไฟ',
          'บัตรสะสมแต้มร้านกาแฟ'
        ],
        correctIndex: 0,
        explanation: 'บัตรประจำตัวนิสิต (หรือบัตรดิจิทัล) ใช้ยืนยันตัวตนในการผ่านเข้า-ออกและทำรายการยืมทรัพยากรสารสนเทศ'
      },
      {
        id: 'q2_5', active: true, stars: 10, image: '',
        question: 'หนังสืออ้างอิง (Reference Books) ที่มีอักษร "อ" หรือ "Ref." กำกับ มีเงื่อนไขการให้บริการอย่างไร?',
        options: [
          'ใช้ค้นคว้าภายในห้องสมุดเท่านั้น ไม่สามารถยืมออกนอกห้องสมุดได้',
          'ยืมกลับบ้านได้นาน 1 ปี',
          'แจกฟรีให้นิสิตนำกลับบ้านได้เลย',
          'อนุญาตให้ตัดภาพประกอบออกจากเล่มได้'
        ],
        correctIndex: 0,
        explanation: 'หนังสืออ้างอิง เช่น พจนานุกรม สารานุกรม ใช้สำหรับค้นคว้าคำตอบเฉพาะเรื่อง จึงสงวนไว้ใช้ภายในห้องสมุดเท่านั้น'
      },
      {
        id: 'q2_6', active: true, stars: 10, image: '',
        question: 'บริการยืมต่อออนไลน์ (Renew) สามารถทำได้ในกรณีใด?',
        options: [
          'ยังไม่เกินกำหนดส่งคืน และไม่มีสมาชิกท่านอื่นจองหนังสือเล่มนั้นต่อ',
          'หนังสือเลยกำหนดส่งคืนมาแล้ว 3 เดือน',
          'ทำหนังสือหายไปแล้ว',
          'มีสมาชิกคนอื่นกดจองหนังสือเล่มนั้นไว้แล้ว'
        ],
        correctIndex: 0,
        explanation: 'การยืมต่อออนไลน์ทำได้ก่อนถึงวันครบกำหนดส่งและต้องไม่มีคิวจองจากผู้ใช้อื่น'
      },
      {
        id: 'q2_7', active: true, stars: 10, image: '',
        question: 'ตู้รับคืนหนังสืออัตโนมัติ (Book Drop) มีประโยชน์อย่างไร?',
        options: [
          'คืนหนังสือได้สะดวก แม้ในเวลาที่เคาน์เตอร์ปิดทำการ',
          'ใช้อัดสำเนาเอกสารสี',
          'ใช้แลกเหรียญหยอดตู้เครื่องดื่ม',
          'ใช้สแกนไวรัสคอมพิวเตอร์'
        ],
        correctIndex: 0,
        explanation: 'เครื่อง Book Drop ช่วยให้ผู้ใช้สามารถส่งคืนหนังสือได้ตลอด 24 ชั่วโมงอย่างรวดเร็ว'
      },
      {
        id: 'q2_8', active: true, stars: 10, image: '',
        question: 'หากทำหนังสือของห้องสมุดชำรุดฉีกขาด ควรปฏิบัติอย่างไร?',
        options: [
          'แจ้งเจ้าหน้าที่บรรณารักษ์เพื่อดำเนินการซ่อมแซมอย่างถูกวิธี',
          'ใช้เทปกาวใสทั่วไปแปะซ่อมเองแล้วแอบเอาไปคืน',
          'ฉีกหน้าที่ขาดทิ้งไป',
          'ไม่ต้องแจ้งใครและเก็บไว้ที่หอพัก'
        ],
        correctIndex: 0,
        explanation: 'การซ่อมหนังสือต้องใช้วัสดุเฉพาะทางสำหรับงานห้องสมุด จึงควรแจ้งบรรณารักษ์ให้ช่วยดูแล'
      },
      {
        id: 'q2_9', active: true, stars: 10, image: '',
        question: 'บริการยืมระหว่างห้องสมุด (Interlibrary Loan - ILL) คือบริการเกี่ยวกับอะไร?',
        options: [
          'ขอยืมหนังสือหรือขอสำเนาบทความจากห้องสมุดสถาบันอื่นที่ร่วมเครือข่าย',
          'ยืมอุปกรณ์กีฬาไปเล่นนอกมหาวิทยาลัย',
          'ยืมรถยนต์ของมหาวิทยาลัย',
          'ยืมชุดครุยรับปริญญา'
        ],
        correctIndex: 0,
        explanation: 'หากทรัพยากรที่ต้องการไม่มีในห้องสมุดของเรา สามารถใช้บริการ ILL เพื่อขอยืมจากห้องสมุดมหาวิทยาลัยเครือข่ายได้'
      },
      {
        id: 'q2_10', active: true, stars: 10, image: '',
        question: 'เมื่อต้องการความช่วยเหลือในการค้นหาข้อมูลทำรายงาน ควรติดต่อจุดบริการใด?',
        options: [
          'เคาน์เตอร์บริการตอบคำถามและช่วยการค้นคว้า (Reference Desk)',
          'จุดรับฝากกระเป๋าหน้าประตู',
          'ห้องเครื่องไฟฟ้า',
          'ลานจอดรถหน้าอาคาร'
        ],
        correctIndex: 0,
        explanation: 'บรรณารักษ์บริการตอบคำถามฯ พร้อมให้คำแนะนำเทคนิคการสืบค้นและแนะนำแหล่งข้อมูลที่เหมาะสมกับหัวข้อวิจัย'
      }
    ],
    stage_3: [
      {
        id: 'q3_1', active: true, stars: 10, image: '',
        question: 'การคัดลอกผลงานวิชาการของผู้อื่นมาใส่ในรายงานโดยไม่อ้างอิงแหล่งที่มา เรียกว่าอะไร?',
        options: [
          'การโจรกรรมทางวิชาการ (Plagiarism)',
          'การสังเคราะห์ข้อมูล (Synthesis)',
          'การสรุปความ (Summarization)',
          'การทบทวนวรรณกรรม (Literature Review)'
        ],
        correctIndex: 0,
        explanation: 'Plagiarism คือการนำความคิดหรือข้อความของผู้อื่นมาเป็นของตนโดยไม่ให้เครดิต ซึ่งผิดจริยธรรมทางวิชาการอย่างร้ายแรง'
      },
      {
        id: 'q3_2', active: true, stars: 10, image: '',
        question: 'หลักเกณฑ์ "CRAAP Test" ใช้เพื่อวัตถุประสงค์ใดในการทำรายงานวิชาการ?',
        options: [
          'ประเมินความน่าเชื่อถือของแหล่งสารสนเทศและเว็บไซต์',
          'ทดสอบความเร็วอินเทอร์เน็ตในห้องสมุด',
          'คำนวณค่าปรับหนังสือเกินกำหนด',
          'ออกแบบปกหนังสือให้น่าสนใจ'
        ],
        correctIndex: 0,
        explanation: 'CRAAP (Currency, Relevance, Authority, Accuracy, Purpose) เป็นเกณฑ์มาตรฐานในการประเมินคุณภาพและความน่าเชื่อถือของข้อมูล'
      },
      {
        id: 'q3_3', active: true, stars: 10, image: '',
        question: 'รูปแบบการเขียนอ้างอิงและบรรณานุกรมที่นิยมใช้ในสาขาสังคมศาสตร์และศึกษาศาสตร์ คือรูปแบบใด?',
        options: [
          'APA Style (American Psychological Association)',
          'MIDI Style',
          'HTML Style',
          'JPEG Style'
        ],
        correctIndex: 0,
        explanation: 'APA Style เป็นมาตรฐานการอ้างอิงที่แพร่หลายมากที่สุดรูปแบบหนึ่งในงานวิชาการระดับมหาวิทยาลัย'
      },
      {
        id: 'q3_4', active: true, stars: 10, image: '',
        question: 'โปรแกรมใดต่อไปนี้เป็นโปรแกรมช่วยจัดการบรรณานุกรม (Reference Management Software)?',
        options: [
          'EndNote, Zotero, Mendeley',
          'Photoshop, Illustrator, Premiere',
          'Excel, PowerPoint, Paint',
          'WinRAR, 7-Zip, VLC'
        ],
        correctIndex: 0,
        explanation: 'EndNote, Zotero และ Mendeley ช่วยจัดเก็บข้อมูลอ้างอิงและแทรกบรรณานุกรมอัตโนมัติในโปรแกรมพิมพ์เอกสาร'
      },
      {
        id: 'q3_5', active: true, stars: 10, image: '',
        question: 'เมื่ออยู่นอกเครือข่ายอินเทอร์เน็ตของมหาวิทยาลัย หากต้องการเข้าใช้ฐานข้อมูลออนไลน์ของห้องสมุดต้องทำอย่างไร?',
        options: [
          'เชื่อมต่อผ่านระบบเครือข่ายเสมือนส่วนตัว (VPN) หรือ OpenAthens ของมหาวิทยาลัย',
          'สมัครสมาชิกใหม่และจ่ายเงินเองทุกครั้ง',
          'โทรให้เพื่อนถ่ายรูปหน้าจอส่งมาให้เท่านั้น',
          'ไม่สามารถเข้าใช้งานจากนอกมหาวิทยาลัยได้เลย'
        ],
        correctIndex: 0,
        explanation: 'นิสิตสามารถเข้าถึงฐานข้อมูลออนไลน์จากที่บ้านได้ผ่านการยืนยันตัวตนด้วย BUU Account ผ่านระบบ VPN / OpenAthens'
      },
      {
        id: 'q3_6', active: true, stars: 10, image: '',
        question: 'บทความวิชาการประเภท "Peer-Reviewed Journal" มีจุดเด่นสำคัญอย่างไร?',
        options: [
          'ผ่านการตรวจสอบคุณภาพจากผู้ทรงคุณวุฒิในสาขานั้นก่อนตีพิมพ์',
          'เขียนขึ้นโดยบุคคลทั่วไปโดยไม่มีการตรวจสอบ',
          'เป็นบทความโฆษณาสินค้า',
          'เผยแพร่เฉพาะในโซเชียลมีเดียเท่านั้น'
        ],
        correctIndex: 0,
        explanation: 'Peer-Reviewed หมายถึงผ่านการกลั่นกรองจากผู้เชี่ยวชาญอิสระ ทำให้มีระดับความน่าเชื่อถือทางวิชาการสูง'
      },
      {
        id: 'q3_7', active: true, stars: 10, image: '',
        question: 'รหัส DOI (Digital Object Identifier) ที่ปรากฏในบทความวิจัยออนไลน์คืออะไร?',
        options: [
          'รหัสถาวรสำหรับระบุตัวตนและเข้าถึงเอกสารดิจิทัลชิ้นนั้นได้เสมอ',
          'รหัสผ่านสำหรับเปิดไฟล์ PDF',
          'หมายเลขบัตรประชาชนของผู้เขียน',
          'รหัสส่วนลดซื้อหนังสือ'
        ],
        correctIndex: 0,
        explanation: 'DOI เป็นรหัสประจำตัวถาวรของเอกสารวิชาการดิจิทัล แม้ลิงก์เว็บไซต์จะเปลี่ยนไปก็ยังใช้ DOI ค้นหาเจอได้'
      },
      {
        id: 'q3_8', active: true, stars: 10, image: '',
        question: 'คลังปัญญามหาวิทยาลัยบูรพา (BUUIR) เป็นแหล่งรวบรวมสารสนเทศประเภทใดเป็นหลัก?',
        options: [
          'วิทยานิพนธ์ ดุษฎีนิพนธ์ และผลงานวิจัยของนิสิตและคณาจารย์ ม.บูรพา',
          'นิยายแปลต่างประเทศทั้งหมด',
          'หนังสือการ์ตูนและนิตยสารบันเทิง',
          'คู่มือซ่อมรถยนต์'
        ],
        correctIndex: 0,
        explanation: 'BUUIR (Burapha University Institutional Repository) จัดเก็บและเผยแพร่ผลงานวิชาการและวิทยานิพนธ์ของมหาวิทยาลัยบูรพา'
      },
      {
        id: 'q3_9', active: true, stars: 10, image: '',
        question: 'การอ่านส่วน "บทคัดย่อ (Abstract)" ของงานวิจัยช่วยให้ผู้อ่านทราบสิ่งใดอย่างรวดเร็ว?',
        options: [
          'วัตถุประสงค์ วิธีดำเนินการวิจัย และผลการวิจัยโดยสรุป',
          'ประวัติส่วนตัวของผู้วิจัยตั้งแต่เด็ก',
          'รายชื่อหนังสือทั้งหมดในห้องสมุด',
          'ราคาต้นทุนการพิมพ์เล่มวิจัย'
        ],
        correctIndex: 0,
        explanation: 'บทคัดย่อสรุปสาระสำคัญทั้งหมดของงานวิจัย ช่วยให้ตัดสินใจได้ทันทีว่างานวิจัยชิ้นนี้ตรงกับเรื่องที่กำลังศึกษาหรือไม่'
      },
      {
        id: 'q3_10', active: true, stars: 10, image: '',
        question: 'ข้อใดคือความหมายของ "สารสนเทศปฐมภูมิ (Primary Source)"?',
        options: [
          'ข้อมูลต้นฉบับที่เกิดจากผู้วิจัยหรือผู้พบเห็นเหตุการณ์โดยตรง',
          'หนังสือสารานุกรมที่รวบรวมสรุปจากหลายแหล่ง',
          'ดัชนีค้นวารสาร',
          'บรรณานุกรมรวมรายชื่อหนังสือ'
        ],
        correctIndex: 0,
        explanation: 'แหล่งปฐมภูมิคือข้อมูลดั้งเดิมที่ไม่ผ่านการตีความซ้ำ เช่น รายงานผลการทดลอง จดหมายเหตุ สัมภาษณ์ต้นฉบับ'
      }
    ],
    stage_4: [
      {
        id: 'q4_1', active: true, stars: 15, image: '',
        question: 'คำว่า "Information Literacy" หรือ การรู้สารสนเทศ หมายถึงทักษะใด?',
        options: [
          'ความสามารถในการตระหนักรู้ ค้นหา ประเมิน และใช้สารสนเทศอย่างมีจริยธรรม',
          'ความสามารถในการซ่อมคอมพิวเตอร์และเดินสายแลน',
          'ความสามารถในการอ่านหนังสือให้จบภายใน 5 นาที',
          'ความสามารถในการท่องจำเลขหน้าหนังสือได้ทุกเล่ม'
        ],
        correctIndex: 0,
        explanation: 'การรู้สารสนเทศ (Information Literacy) คือทักษะสำคัญแห่งศตวรรษที่ 21 ในการเข้าถึง ประเมิน และใช้ข้อมูลอย่างสร้างสรรค์และถูกต้อง'
      },
      {
        id: 'q4_2', active: true, stars: 15, image: '',
        question: 'สัญลักษณ์ลิขสิทธิ์ "Creative Commons (CC BY)" อนุญาตให้ผู้อื่นนำผลงานไปใช้ได้ภายใต้เงื่อนไขใด?',
        options: [
          'นำไปเผยแพร่ ดัดแปลง หรือใช้ต่อได้ โดยต้องระบุที่มาของเจ้าของผลงาน',
          'นำไปขายต่อโดยห้ามระบุชื่อผู้สร้างสรรค์',
          'ห้ามเปิดดูและห้ามเผยแพร่ทุกกรณี',
          'ต้องจ่ายค่าลิขสิทธิ์ให้ห้องสมุดทุกครั้งที่เปิดอ่าน'
        ],
        correctIndex: 0,
        explanation: 'CC BY (Attribution) เปิดโอกาสให้แบ่งปันและต่อยอดผลงานได้อย่างเสรี เพียงแค่ให้เครดิตอ้างอิงเจ้าของผลงานเดิม'
      },
      {
        id: 'q4_3', active: true, stars: 15, image: '',
        question: 'ระบบการยืม-คืนหนังสือด้วยตนเอง (Self-Check Machine) ทำงานด้วยเทคโนโลยีใดเป็นหลัก?',
        options: [
          'เทคโนโลยีคลื่นความถี่วิทยุ (RFID) หรือบาร์โค้ด',
          'เทคโนโลยีพลังงานแสงอาทิตย์',
          'เทคโนโลยีดาวเทียมนำทาง GPS',
          'เทคโนโลยีการพิมพ์ 3 มิติ'
        ],
        correctIndex: 0,
        explanation: 'เครื่อง Self-Check ใช้เทคโนโลยี RFID อ่านข้อมูลแท็กในตัวเล่มหนังสือ ทำให้ยืม-คืนได้พร้อมกันหลายเล่มอย่างรวดเร็ว'
      },
      {
        id: 'q4_4', active: true, stars: 15, image: '',
        question: 'แนวคิด "Learning Commons" ในห้องสมุดยุคใหม่มุ่งเน้นการออกแบบพื้นที่เพื่อสิ่งใด?',
        options: [
          'พื้นที่การเรียนรู้ที่ยืดหยุ่น ผสานเทคโนโลยีและการทำงานร่วมกันของนิสิต',
          'พื้นที่เก็บเอกสารเก่าที่ห้ามคนเข้าใกล้',
          'พื้นที่สำหรับวางจำหน่ายสินค้าเชิงพาณิชย์',
          'พื้นที่เงียบสนิทที่ห้ามใช้คอมพิวเตอร์'
        ],
        correctIndex: 0,
        explanation: 'Learning Commons เปลี่ยนห้องสมุดจากที่เก็บหนังสือให้เป็นศูนย์กลางการเรียนรู้ร่วมกันที่ทันสมัยและเอื้อต่อความคิดสร้างสรรค์'
      },
      {
        id: 'q4_5', active: true, stars: 15, image: '',
        question: 'หากต้องการค้นหาหนังสืออิเล็กทรอนิกส์ (E-Books) ของห้องสมุด ควรเริ่มต้นที่ช่องทางใดสะดวกที่สุด?',
        options: [
          'ระบบสืบค้น OPAC หรือหน้าเว็บไซต์บริการ E-Books ของสำนักหอสมุด',
          'เดินหาตามชั้นหนังสือไม้ในโซนหนังสือหายาก',
          'ค้นหาจากสมุดโทรศัพท์หน้าเหลือง',
          'สอบถามจากร้านถ่ายเอกสารนอกมหาวิทยาลัย'
        ],
        correctIndex: 0,
        explanation: 'ในระบบ OPAC และเว็บไซต์ห้องสมุดมีลิงก์เข้าถึง E-Books ที่สามารถคลิกอ่านออนไลน์หรือดาวน์โหลดได้ทันที'
      },
      {
        id: 'q4_6', active: true, stars: 15, image: '',
        question: 'ในเลขเรียกหนังสือระบบ LC เช่น "QA76.73 .P98 2024" ตัวเลข "2024" ท้ายสุดหมายถึงอะไร?',
        options: [
          'ปีที่พิมพ์ของหนังสือเล่มนั้น',
          'จำนวนหน้าของหนังสือ',
          'ราคาหนังสือเป็นเงินบาท',
          'ลำดับที่ของผู้ยืมหนังสือ'
        ],
        correctIndex: 0,
        explanation: 'ตัวเลข 4 หลักท้ายเลขเรียกหนังสือระบบ LC คือปีที่พิมพ์ (Publication Year) ช่วยให้เลือกฉบับพิมพ์ที่ทันสมัยที่สุดได้'
      },
      {
        id: 'q4_7', active: true, stars: 15, image: '',
        question: 'การใช้เครื่องมือตรวจสอบการคัดลอกผลงาน (เช่น Turnitin / อักขราวิสุทธิ์) มีประโยชน์อย่างไร?',
        options: [
          'ตรวจสอบความคล้ายคลึงของข้อความเพื่อปรับปรุงการอ้างอิงให้ถูกต้องก่อนส่งงาน',
          'ใช้เขียนรายงานแทนนิสิตทั้งหมดโดยไม่ต้องค้นคว้า',
          'ใช้แปลภาษาอัตโนมัติ',
          'ใช้ลดขนาดไฟล์รูปภาพ'
        ],
        correctIndex: 0,
        explanation: 'โปรแกรมตรวจสอบความซ้ำซ้อนช่วยให้ผู้เขียนตรวจสอบจุดที่อ้างอิงไม่ครบถ้วน ป้องกันปัญหาการละเมิดจริยธรรมทางวิชาการ'
      },
      {
        id: 'q4_8', active: true, stars: 15, image: '',
        question: 'การเรียนรู้ตลอดชีวิต (Lifelong Learning) เกี่ยวข้องกับห้องสมุดอย่างไร?',
        options: [
          'ห้องสมุดเป็นแหล่งเรียนรู้เปิดกว้างสำหรับทุกคนทุกช่วงวัยในการพัฒนาตนเองต่อเนื่อง',
          'ห้องสมุดเปิดให้เข้าได้เฉพาะช่วงสอบกลางภาคเท่านั้น',
          'เมื่อเรียนจบแล้วห้ามอ่านหนังสือวิชาการอีก',
          'ห้องสมุดให้บริการเฉพาะหนังสือเรียนชั้นประถม'
        ],
        correctIndex: 0,
        explanation: 'ห้องสมุดคือหัวใจของการเรียนรู้ตลอดชีวิต เปิดโอกาสให้ผู้เรียนแสวงหาความรู้ใหม่ๆ ได้อย่างไม่มีที่สิ้นสุด'
      },
      {
        id: 'q4_9', active: true, stars: 15, image: '',
        question: 'เมื่อพบข้อมูลข่าวสารบนอินเทอร์เน็ตที่แชร์ต่อกันมา วิธีตรวจสอบข้อเท็จจริง (Fact-Checking) ที่ดีที่สุดคือข้อใด?',
        options: [
          'ตรวจสอบแหล่งที่มาต้นทาง เปรียบเทียบกับแหล่งข้อมูลวิชาการหรือหน่วยงานทางการ',
          'เชื่อทันทีหากมีคนกดไลก์จำนวนมาก',
          'แชร์ต่อทันทีโดยไม่อ่านเนื้อหา',
          'ดูจากสีสันของตัวอักษรในโพสต์'
        ],
        correctIndex: 0,
        explanation: 'การตรวจสอบย้อนกลับไปยังแหล่งข้อมูลปฐมภูมิและเทียบเคียงหลายแหล่งที่เชื่อถือได้ช่วยป้องกันข่าวปลอม (Fake News)'
      },
      {
        id: 'q4_10', active: true, stars: 15, image: '',
        question: 'หัวใจสำคัญที่สุดของการเป็น "สุดยอดนักพิชิตห้องสมุด (The Library Master)" คือข้อใด?',
        options: [
          'รู้จักสืบค้นอย่างชาญฉลาด วิเคราะห์ข้อมูลอย่างมีวิจารณญาณ และเคารพกฎกติกาส่วนรวม',
          'วิ่งเสียงดังในห้องสมุดให้เร็วที่สุด',
          'ยืมหนังสือไปเก็บไว้คนเดียวโดยไม่ส่งคืน',
          'เดาคำตอบทุกข้อโดยไม่อ่านคำอธิบาย'
        ],
        correctIndex: 0,
        explanation: 'ยอดเยี่ยมมาก! คุณมีทั้งทักษะการรู้สารสนเทศ จริยธรรมทางวิชาการ และจิตสำนึกที่ดีในการใช้ห้องสมุด'
      }
    ]
  };
}

const Store = {
  getStages() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.STAGES);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.STAGES, JSON.stringify(DEFAULT_STAGES));
        return JSON.parse(JSON.stringify(DEFAULT_STAGES));
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : JSON.parse(JSON.stringify(DEFAULT_STAGES));
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT_STAGES));
    }
  },
  saveStages(stages) {
    localStorage.setItem(STORAGE_KEYS.STAGES, JSON.stringify(stages));
  },
  getAllQuestions() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (!raw) {
        const def = createDefaultQuestions();
        localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(def));
        return def;
      }
      return JSON.parse(raw);
    } catch (e) {
      return createDefaultQuestions();
    }
  },
  saveAllQuestions(qMap) {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(qMap));
  },
  getStageQuestions(stageId) {
    const all = this.getAllQuestions();
    if (!all[stageId]) {
      const def = createDefaultQuestions();
      all[stageId] = def[stageId] ? JSON.parse(JSON.stringify(def[stageId])) : [];
      this.saveAllQuestions(all);
    }
    return all[stageId];
  },
  saveStageQuestions(stageId, list) {
    const all = this.getAllQuestions();
    all[stageId] = list;
    this.saveAllQuestions(all);
  },
  getLeaderboard() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },
  addScoreRecord(record) {
    const lb = this.getLeaderboard();
    lb.push(record);
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(lb));
  },
  isNameTaken(name) {
    const clean = name.trim().toLowerCase();
    if (!clean) return false;
    const lb = this.getLeaderboard();
    return lb.some(item => (item.playerName || '').trim().toLowerCase() === clean);
  },
  resetAllScores() {
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify([]));
  },
  setActiveSession(sessionObj) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionObj));
  },
  getActiveSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
};

// Initialize defaults on load
Store.getStages();
Store.getAllQuestions();

function formatSeconds(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function getTop10ForStage(stageId) {
  const all = Store.getLeaderboard().filter(r => r.stageId === stageId);
  all.sort((a, b) => {
    if (b.stars !== a.stars) return b.stars - a.stars;
    return a.timeSeconds - b.timeSeconds;
  });
  return all.slice(0, 10);
}

function renderLeaderboardRows(tbodyEl, records, highlightName = '') {
  tbodyEl.innerHTML = '';
  if (records.length === 0) {
    tbodyEl.innerHTML = `<tr><td colspan="4" class="py-6 text-center text-slate-400 font-semibold">ยังไม่มีสถิติผู้เล่นในด่านนี้</td></tr>`;
    return;
  }
  const medals = ['🥇', '🥈', '🥉'];
  records.forEach((rec, idx) => {
    const isMe = highlightName && rec.playerName === highlightName;
    const tr = document.createElement('tr');
    tr.className = isMe ? 'bg-amber-100/90 text-purple-950 font-extrabold' : 'text-slate-700';
    tr.innerHTML = `
      <td class="py-2 px-2">${medals[idx] || `#${idx + 1}`}</td>
      <td class="py-2 px-2 truncate max-w-[160px]">${rec.playerName}</td>
      <td class="py-2 px-2 text-right text-amber-600 font-extrabold">⭐ ${rec.stars}</td>
      <td class="py-2 px-2 text-right text-sky-700">${formatSeconds(rec.timeSeconds)}</td>
    `;
    tbodyEl.appendChild(tr);
  });
}
