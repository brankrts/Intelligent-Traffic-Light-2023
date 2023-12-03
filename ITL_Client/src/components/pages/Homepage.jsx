import React from "react";
import { useState } from "react";
import SettingsModal from "../modals/SettingsModal";

const HomePage = () => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  return (
    <div className="w-full min-h-screen flex flex-col items-center text-white my-20">
      <div className="w-full p-8">
        <div className="max-w-3xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Sistem Ayarları</h2>
            <p className="text-lg mb-4">
              Sistemin doğru çalışabilmesi için tüm kameraların ayarlarının
              yapılandırılması önemlidir. Bu kapsamda, her kameranın
              çözünürlüğü, netlik ayarları, kontrast ve parlaklık seviyeleri
              dikkate alınmalıdır. Ayrıca, resimler üzerinde oluşturulacak ROI
              (Region of Interest) için koordinatların belirlenmesi ve belirli
              bir nesnenin algılanması için gerekli olan renk filtreleri ve
              segmentasyon teknikleri konfigüre edilmelidir.
            </p>
            <img
              src="sistem-ayar-resmi.png"
              alt="Sistem Ayarları"
              className="mb-4"
            />
          </section>
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Görüntü İşleme Ayarları</h2>
            <p className="text-lg mb-4">
              Görüntü işleme sürecinde kullanılan Image Threshold (Görüntü Eşik)
              değerleri, kontur hesaplamalarında kullanılan algoritma
              parametreleri ve piksellerin aralarındaki uzaklıkların
              belirlenmesi, nesnelerin doğru bir şekilde algılanması için kritik
              öneme sahiptir. Öte yandan, görüntüdeki nesnelerin belirlenmesi ve
              izlenmesi için hareket algılama ve takip algoritmalarının doğru
              bir şekilde yapılandırılması gerekmektedir. Belirlenen threshold
              aralıklarında görüntü segmentasyonu ve nesne tespiti için
              kullanılacak filtrelerin ve algoritmaların seçimi, doğru veri elde
              edilmesi için hayati öneme sahiptir.
            </p>
            <img
              src="goruntu-isleme-ayar-resmi.png"
              alt="Görüntü İşleme Ayarları"
              className="mb-4"
            />
          </section>
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Server Tarafı Ayarları</h2>
            <p className="text-lg mb-4">
              Server tarafında OpenCV kullanılarak gerçekleştirilen görüntü
              işleme işlemleri için farklı parametrelerin yapılandırılması
              gerekmektedir. Bu parametreler arasında görüntü işleme
              algoritmalarının seçimi, görüntü eşiği belirleme, kontur hesaplama
              yöntemleri ve görüntü segmentasyonu için kullanılan ölçütler
              bulunmaktadır. Ayrıca, piksellerin arasındaki uzaklıkların
              hesaplanması ve belirli nesnelerin tespiti için kullanılan eşik
              değerlerinin belirlenmesi de önemlidir.
            </p>
            <img
              src="server-ayar-resmi.png"
              alt="Server Ayarları"
              className="mb-4"
            />
            <p className="text-lg mb-4">
              Server tarafında yapılan bu ayarlamalar, görüntü işleme
              süreçlerinin verimli bir şekilde gerçekleştirilmesi ve sistemde
              elde edilen verilerin doğru bir şekilde işlenerek sunulması
              açısından büyük önem taşımaktadır.
            </p>
          </section>
        </div>
      </div>
      <button
        onClick={() => {
          setIsSettingOpen(true);
        }}
        className="bg-white text-blue-500 font-bold py-3 px-6 rounded-full mt-8 hover:bg-blue-700 hover:text-white transition duration-300"
      >
        Ayarları Aç
      </button>
      {isSettingOpen && <SettingsModal setIsSettingOpen={setIsSettingOpen} />}
    </div>
  );
};

export default HomePage;
