// Припустимо, що у нас є текстовий файл, який виглядає так:
//  a 1-5: abcdj
//  z 2-4: asfalseiruqwo
//  b 3-6: bhhkkbbjjjb
//  Кожен рядок складається з вимоги до пароля та самого пароля. Вимога до пароля вказує
//  символ, який повинен бути у паролі, і скільки разів він повинен зустрічатися. Наприклад,
//  вимога у першому рядку означає, що символ "a" повинен зустрічатися від 1 до 5 разів. У
//  прикладі вище два паролі валідні (1 і 3), тому що задовольняють своїм вимогам, 2-й- ні,
//  тому що символ "z" в ньому повинен зустрічатися від 2 до 4 разів, але не зустрічається
//  жодного разу.
//  Потрібно написати код, який порахує кількість валідних паролів у такому файлі.

const fs = require('fs');

const list = ["a 1-5: abcdj", "z 2-4: asfalseiruqwo", "b 3-6: bhhkkbbjjjb"];

//Перевіряємо валідність паролю
const validator = (char, minCount, maxCount, password) => {
    let charCount = 0;

    for(let c of password) {
        if(c === char) charCount++

        //якщо символів більше ніж maxCount  одразу повертаємо false
        if(charCount > maxCount) return false
    }

    return charCount >= minCount;
}

//Розбиваємо паролі на окремі змінні та прокидуємо в валідатор
const countValidPasswords = (passwordList) => {
    return passwordList.reduce((count, item) => {
        const [rule, password] = item.split(": ");
        const [char, range] = rule.split(" ");
        const [minCount, maxCount] = range.split("-").map(Number);

        // Якщо пароль валідний, збільшуємо лічильник
        if (validator(char, minCount, maxCount, password)) count++;
        return count;
    }, 0);
}

//Зчитуємо файл та перетворюємо на массив рядків
const readFileAndCountValidPasswords = (filePath) => {
    fs.readFile(filePath, "utf-8", (err, data) => {

        if(err) {
            console.error("Помилка при читанні файлу:", err);
            return;
        }

        const passwordList = data.trim().split("\n");
        const validPasswords = countValidPasswords(passwordList);

        console.log("Кількість валідних паролів:", validPasswords);
    })
}

const filePath = "./passwords.txt";

readFileAndCountValidPasswords(filePath);