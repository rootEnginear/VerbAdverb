# VerbAdverb
VerbAdverb คือ PWA เอาไว้เล่นเกม VerbAdverb ในมือถือกับเพื่อน *ที่ทำไม่ใช่อะไรนะขี้เกียจทำฉลากไว้จับ*

ฟีเจอร์:
- สุ่มคำศัพท์พร้อมกับเสียงดนตรีสุดจะลุ้น
- มีสปินเนอร์ไว้สุ่มคนกรณีนั่งเล่นกันเป็นวงกลม
- ตั้งค่า เปิด/ปิด เสียงได้ เพิ่มคำศัพท์เองได้
- ใช้ได้ทั้งภาษาไทยและภาษาอังกฤษ

ทำเพื่ออะไร?
- ลองใช้ Vue CLI ครั้งแรก
- ลองเล่น SCSS ครั้งแรก
- ได้ลอง Vuetify ครั้งแรก
- ได้ลอง Vuex ครั้งแรก
- ได้ลอง Vuex i18n ครั้งแรก

เจอปัญหาอะไรบ้าง?
- สะกด `methods:` เป็น `method:` เลยแก้ไปเกือบ 1 ชม.
- ใช้ register-service-worker ไม่เป็น (ตอนนี้จับแพะชนแกะเอา)
- ยังงงๆ เรื่องการ reference ตัวแปรจาก `$root` หน่อยๆ
- ลืมว่าฟังก์ชันรับข้อมูลประเภทอะไร (เขียนไว้รับ `Array` แต่ลืมเลยส่งเป็น `Object` ไป ทำให้เสียเวลามาหาจุดผิด)

สิ่งที่จะทำ:
- เรียนรู้การทำงานของ Node Package Manager ให้มากขึ้นอีก
- ~~ศึกษา Vuex (เพราะเห็นตาม forum แนะนำกันเยอะตอนหาการอ้างอิง data จาก child มา parent ยังไม่รู้เหมือนกันว่ามันคืออะไรแหละแต่จะลองดูนะ)~~ ใช้แล้วตอนนี้ XD
- ลองนำ Vue ไปปรับใช้กับงานที่เคยทำมาก่อนหน้า (ถ้าช่วยชี้แนะจักขอบคุณเป็นอย่างสูงค่ะ 🙏)