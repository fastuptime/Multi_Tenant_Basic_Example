# 🚀 Multi-Tenant Uygulama README 🏢

Bu uygulama, çok kiracılı (multi-tenant) bir yapıya sahiptir. Her bir kiracıya özgü yapılandırmaları yönetmek için StarDB kullanılmıştır.

## Ekran Görüntüleri 📷

![image](https://github.com/fastuptime/Multi_Tenant_Basic_Example/assets/63351166/ca8d6418-454e-4aa0-b9f8-c4800115b539)
![image](https://github.com/fastuptime/Multi_Tenant_Basic_Example/assets/63351166/23c904ab-e973-49ac-a5e2-d6cdcd009812)
![image](https://github.com/fastuptime/Multi_Tenant_Basic_Example/assets/63351166/de9dd2b0-e806-4612-b95e-c7c17c5603f0)
![image](https://github.com/fastuptime/Multi_Tenant_Basic_Example/assets/63351166/848726a4-0909-4a80-9dde-fb3ef96c0ad5)
![image](https://github.com/fastuptime/Multi_Tenant_Basic_Example/assets/63351166/4f1c29a8-e7b5-406a-801d-4054e910f545)


## 🤔 Multi-Tenant Nedir?

Çok kiracılı sistemler, tek bir uygulamanın birden fazla kiracıya (müşteri, kullanıcı) hizmet vermesini sağlar. Her bir kiracı kendi verilerini, yapılandırmalarını ve iş süreçlerini yönetebilir. Bu tür sistemler genellikle yazılım hizmet sağlayıcıları tarafından kullanılır ve genellikle paylaşılan bir altyapı üzerine inşa edilir.

## Başlarken 🛠️

Uygulamayı başlatmak için aşağıdaki adımları izleyin:

1. **Gereksinimlerin Yüklenmesi**
   
   Uygulamayı çalıştırmak için öncelikle aşağıdaki paketlerin yüklü olduğundan emin olun:
   ```
   npm install express stardb
   ```

2. **Konfigürasyon ⚙️**

   Uygulamanın çalışması için her bir kiracıya özgü yapılandırmaları `database.json` dosyasına eklemeniz gerekmektedir. Aşağıdaki gibi bir örnek kullanılabilir:

   ```json
   [
       {
           "site": "example.com",
           "blocked": false,
           "maintenance": false
       },
       {
           "site": "example2.com",
           "blocked": false,
           "maintenance": true
       }
   ]
   ```

3. **Uygulamanın Başlatılması**

   Uygulamayı başlatmak için terminalde aşağıdaki komutu çalıştırın:
   ```
   node app.js
   ```
   veya
   ```
   nodemon app.js
   ```

4. **Test 🧪**

   Uygulamanın başarıyla çalıştığını doğrulamak için tarayıcınızda `http://localhost` adresine gidin.

## MongoDB ile Çok Kiracılı Uygulama Nasıl Yapılır? 📦

Gerçek bir çok kiracılı uygulama için MongoDB gibi bir NoSQL veritabanı kullanılabilir. Her bir kiracıya ait verileri farklı koleksiyonlarda veya aynı koleksiyonda ayrı belgelerde saklayabilirsiniz.

Örneğin, kullanıcıları saklamak için bir `User` şeması oluşturabilir ve her bir kullanıcı belgesinde `domain` alanını tutabilirsiniz:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    domain: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

Kullanıcıları domainlerine göre sorgulamak ve getirmek için bir yardımcı fonksiyon ekleyebilirsiniz:

```javascript
const User = require('./userModel');

// Domain ve kullanıcı adına göre kullanıcıları getirme
async function getUserByDomain({ domain, username }) {
    try {
        const user = await User.findOne({ domain: domain, username: username });
        return user;
    } catch (error) {
        console.error('Kullanıcı getirilemedi:', error);
        throw error;
    }
}

module.exports = { getUserByDomain };
```

Bu fonksiyon, belirli bir domain ve kullanıcı adına sahip olan kullanıcıyı MongoDB'den getirir. Uygulamanın başka yerlerinde bu fonksiyonu kullanarak, istenen domain ve kullanıcı adına sahip kullanıcıyı getirebilirsiniz.

```javascript
const { getUserByDomain } = require('./userController');

// Örnek: "example.com" domainine ve "Can" kullanıcı adına sahip kullanıcıyı getirme
const user = await getUserByDomain({ domain: "example.com", username: "Can" });
console.log(user);
```
Bu şekilde, belirli bir domain ve kullanıcı adına sahip olan kullanıcıyı bulmak için kullanabilirsiniz.


## API Kullanımı 🌐

Uygulama, aşağıdaki API rotalarını destekler:

- `GET /`: Ana sayfaya yönlendirir ve kiracının domain adını gösterir.
  
## Notlar 📝

- Bu örnek uygulama performansı artırmak için basit bir dosya tabanlı veritabanı kullansa da, gerçek bir multi-tenant uygulaması için MongoDB veya Redis gibi veritabanları daha uygun olabilir.
- Her bir kiracıya özgü yapılandırmaları güncellemek veya yeni kiracılar eklemek için `database.json` dosyasını düzenleyebilirsiniz.

---
