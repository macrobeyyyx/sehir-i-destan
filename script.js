const categories = [
    { name: "KAHVALTI TABAKLARI VE OMLETLER", icon: "🍳" },
    { name: "ATIŞTIRMALIKLAR", icon: "🍪" },
    { name: "MİNİ PASTA ÇEŞİTLERİ", icon: "🧁" },
    { name: "TEK PASTALAR", icon: "🎂" },
    { name: "SÜTLÜ TATLILAR", icon: "🍨" },
    { name: "ŞERBETLİ TATLILAR", icon: "🍋" },
    { name: "ÇAY ÇEŞİTLERİ", icon: "🍵" },
    { name: "KAHVE ÇEŞİTLERİ", icon: "☕" },
    { name: "SOĞUK KAHVELER", icon: "🧊" },
];

const menuItems = [
    { icon: "🍳", name: "Serpme Kahvaltı", price: 150.00, category: "KAHVALTI TABAKLARI VE OMLETLER" },
    { icon: "🍟", name: "Patates Kızartması", price: 45.00, category: "ATIŞTIRMALIKLAR" },
    { icon: "🧁", name: "Çikolatalı Mini Pasta", price: 35.00, category: "MİNİ PASTA ÇEŞİTLERİ" },
    { icon: "🍰", name: "Frambuazlı Cheesecake", price: 60.00, category: "TEK PASTALAR" },
    { icon: "🍮", name: "Sütlaç", price: 40.00, category: "SÜTLÜ TATLILAR" },
    { icon: "🍯", name: "Fırın Sütlaç", price: 45.00, category: "ŞERBETLİ TATLILAR" },
    { icon: "🍵", name: "Türk Çayı", price: 15.00, category: "ÇAY ÇEŞİTLERİ" },
    { icon: "☕", name: "Türk Kahvesi", price: 30.00, category: "KAHVE ÇEŞİTLERİ" },
    { icon: "🧊", name: "Soğuk Americano", price: 40.00, category: "SOĞUK KAHVELER" },
    { icon: "🥐", name: "Sade Açma", price: 20.00, category: "ATIŞTIRMALIKLAR" },
    { icon: "🥪", name: "Karışık Sandviç", price: 95.00, category: "ATIŞTIRMALIKLAR" },
    { icon: "🥪", name: "Mini Sandviç", price: 75.00, category: "ATIŞTIRMALIKLAR" },
];

let selectedItems = [];
let tableNumber = null;

function renderCategories() {
    const categoriesList = document.getElementById('categories');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = `${category.icon} ${category.name}`;
        li.onclick = () => filterItems(category.name);
        categoriesList.appendChild(li);
    });
}

function renderMenuItems(items) {
    const menuItemsContainer = document.getElementById('menuItems');
    menuItemsContainer.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <div style="font-size: 40px;">${item.icon}</div>
            <h3>${item.name}</h3>
            <p>₺${item.price.toFixed(2)}</p>
            <button class="btn" onclick="addItem('${item.name}')">Ekle</button>
        `;
        menuItemsContainer.appendChild(div);
    });
}

function filterItems(category) {
    document.getElementById('selectedCategory').textContent = category;
    const filteredItems = category === "Tüm Kahvaltılık Ürünler" 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    renderMenuItems(filteredItems);
}

function addItem(itemName) {
    if (!tableNumber) {
        alert('Lütfen önce masa numarası seçin!');
        openModal();
        return;
    }
    const item = menuItems.find(i => i.name === itemName);
    const existingItem = selectedItems.find(i => i.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        selectedItems.push({ ...item, quantity: 1 });
    }
    updateSelectedItems();
}

function removeItem(itemName) {
    const index = selectedItems.findIndex(i => i.name === itemName);
    if (index > -1) {
        if (selectedItems[index].quantity > 1) {
            selectedItems[index].quantity -= 1;
        } else {
            selectedItems.splice(index, 1);
        }
    }
    updateSelectedItems();
}

function updateSelectedItems() {
    const selectedItemsList = document.getElementById('selectedItemsList');
    selectedItemsList.innerHTML = '';
    let total = 0;
    selectedItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.icon} ${item.name} x${item.quantity} - ₺${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeItem('${item.name}')">Çıkar</button>
        `;
        selectedItemsList.appendChild(li);
        total += item.price * item.quantity;
    });
    document.getElementById('totalPrice').textContent = total.toFixed(2);
    updateQRCode();
}

function updateQRCode() {
if (!tableNumber) return;

const itemsList = selectedItems.map(item => `${item.name} x${item.quantity}`).join(', ');
const qrContent = `Masa: ${tableNumber}\nSipariş: ${itemsList}\nToplam: ₺${document.getElementById('totalPrice').textContent}`;

// QR kodunu oluşturma
const qr = qrcode(0, 'L');
qr.addData(qrContent);
qr.make();

document.getElementById('qrcode').innerHTML = qr.createImgTag(4);
}

function setTableNumber() {
const input = document.getElementById('tableNumberInput');
const number = parseInt(input.value);
if (number >= 1 && number <= 50) {
    tableNumber = number;
    document.getElementById('tableNumberDisplay').textContent = tableNumber;
    closeModal();
    updateSelectedItems(); // Seçili ürünleri güncelle
} else {
    alert('Lütfen geçerli bir masa numarası girin (1-50 arası).');
}
}

function openModal() {
document.getElementById('tableModal').style.display = 'block';
}

function closeModal() {
document.getElementById('tableModal').style.display = 'none';
}
// Değişecek başlıklar dizisi
const titles = [
    "Hoş Geldiniz!",
    "Şehir-i Destan'a",
    "Cafe",
    "Nargile",
    "Okey"
];

// Başlık değişim süresi (milisaniye cinsinden)
const changeInterval = 2000; // 2 saniye

let currentIndex = 0;

// Başlığı değiştiren fonksiyon
function changeTitle() {
    document.title = titles[currentIndex];
    currentIndex = (currentIndex + 1) % titles.length; // Başlık dizisini döngüsel olarak değiştir
}

// İlk başlığı ayarla
changeTitle();
// Belirli aralıklarla başlığı değiştir
setInterval(changeTitle, changeInterval);

// Sayfa yüklendiğinde kategorileri ve menü öğelerini render et
document.addEventListener('DOMContentLoaded', () => {
renderCategories();
renderMenuItems(menuItems);
});
