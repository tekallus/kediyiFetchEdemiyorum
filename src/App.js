import React, { useState, useEffect } from "react";
import "./styles.css";

//useEffect fonksiyonu, genellikle asenkron işlemleri yönetmek için kullanılır.
//Ancak, useEffect fonksiyonu doğrudan bir async işlevi içermemelidir.
//Bunun nedeni, useEffect'in geri dönüş değerinin bir temizleme işlevi olması gerektiğidir.
//Temizleme işlevi, bir useEffect çalıştırılmadan önce veya bir bileşen devre dışı bırakıldığında çalıştırılır.
const url =
  "https://api.thecatapi.com/v1/images/search?limit=8&size=full&breed_id=beng&sub_id=demo-ca06d4";

async function fetchCat() {
  try {
    const res = await fetch(url);
    const cats = await res.json();
    const cat = cats[0];
    const href = cat.url;
    return href;
  } catch (e) {
    console.error("kedi cekme hatasi", e);
    return null;
  }
}

export default function App() {
  const [cat, setCat] = useState();

  useEffect(() => {
    // 1. İç fonksiyonu tanımla
    const fetchData = async () => {
      //// 2. disarida tanimli fonksiyona gore Asenkron işlemleri gerçekleştir
      const resp = await fetchCat();
      console.log(resp);
      setCat(resp);
    };
    // 3. İç fonksiyonu çağır
    fetchData();
  }, []); // Boş bağımlılık dizisi, sadece bileşen ilk kez oluşturulduğunda çalışmasını sağlar

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <img src={cat} alt="cat" width="300px" />
    </div>
  );
}
