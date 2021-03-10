$(document).ready(function () {
  /* scroll */

  $("a[href^='#']").click(function () {
    var target = $(this).attr("href");
    var product = $(this).parent().find("h3").text();
    $(
      "#order_form select[name='comment'] option[value='" + product + "']"
    ).prop("selected", true);
    $("html, body").animate({ scrollTop: $(target).offset().top + "px" });
    return false;
  });

  $(".single-item").slick({
    infinite: true,
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  /* timer */

  function update() {
    var Now = new Date(),
      Finish = new Date();
    Finish.setHours(23);
    Finish.setMinutes(59);
    Finish.setSeconds(59);
    if (
      Now.getHours() === 23 &&
      Now.getMinutes() === 59 &&
      Now.getSeconds === 59
    ) {
      Finish.setDate(Finish.getDate() + 1);
    }
    var sec = Math.floor((Finish.getTime() - Now.getTime()) / 1000);
    var hrs = Math.floor(sec / 3600);
    sec -= hrs * 3600;
    var min = Math.floor(sec / 60);
    sec -= min * 60;
    $(".timer .hours").html(pad(hrs));
    $(".timer .minutes").html(pad(min));
    $(".timer .seconds").html(pad(sec));
    setTimeout(update, 200);
  }
  function pad(s) {
    s = ("00" + s).substr(-2);
    return "<span>" + s[0] + "</span><span>" + s[1] + "</span>";
  }
  update();

  function validatePhone(phoneValue) {
    let regex = /^(\+)?(38)?0\(?[0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!regex.test(phoneValue)) {
      return false;
    }
    return true;
  }
  async function sendMessage({ name, phone }) {
    const BOT_API_KEY = "1606647901:AAFykXDStBiPeeMBR6LmHA9HGvCmQOK38Dc";
    const CHANNEL_ID = "1001452408584";
    const text = `Name: ${name} \t
		\n TEL: ${phone} `;

    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://api.telegram.org/bot${BOT_API_KEY}/sendMessage?chat_id=${CHANNEL_ID}&text=${text}`
    );
    xhr.send();

    xhr.onload = function () {
      if (xhr.status != 200) {
        alert("Ошыбка! Попробуйте позже");
      } else {
        alert("Подтвердите заказ!");
        window.location.href = `./thankYouPage.html?name=${name}&phone=${phone}`;
      }
    };
    xhr.onerror = function () {
      alert("Request failed");
    };
  }

  /* validate form */

  $(".order_form").submit( async function (event) {
    event.preventDefault();
    event.stopPropagation();
    const name = $(this).find("input[name='name']").val();
    const phone = $(this).find("input[name='phone']").val().trim();

    if (name === "" && phone === "") {
      alert("Введите Ваши имя и телефон");
      $(this).find("input[name='name']").focus();
      return false;
    } else if (name === "") {
      alert("Введите Ваше имя");
      $(this).find("input[name='name']").focus();
      return false;
    } else if (phone === "") {
      alert("Введите Ваш телефон");
      $(this).find("input[name='phone']").focus();
      return false;
    }
    if (validatePhone(phone)) {
      await sendMessage({name,phone});
      
     

    } else {
      alert(
        "Вы ввели неправильный номер телефона!\n" +
          "Введите в формате +380 00 000 0000\n" +
          "Или 099 000 0000"
      );
       $(this).find("input[name='phone']").focus();
    }
  });
 
    
  
 
});
