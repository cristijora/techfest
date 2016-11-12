



<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
  <title>Metronic Shop | A Responsive Email Template</title>
  <style type="text/css">
  html { -webkit-text-size-adjust:none; -ms-text-size-adjust: none;}
@media only screen and (max-device-width: 680px), only screen and (max-width: 680px) {
*[class="table_width_100"] {
    width: 96% !important;
  }
*[class="border-right_mob"] {
    border-right: 1px solid #dddddd;
  }
*[class="mob_100"] {
    width: 100% !important;
  }
*[class="mob_center"] {
    text-align: center !important;
  }
*[class="mob_center_bl"] {
    float: none !important;
    display: block !important;
    margin: 0px auto;
  }
.iage_footer a {
    text-decoration: none;
    color: #929ca8;
  }
  img.mob_display_none {
    width: 0px !important;
    height: 0px !important;
    display: none !important;
  }
  img.mob_width_50 {
    width: 40% !important;
    height: auto !important;
  }
}
.table_width_100 {
  width: 680px;
}
</style>
</head>

<body style="padding: 0px; margin: 0px;">
<div id="mailsub" class="notification" align="center">

  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width: 320px;"><tr><td align="center" bgcolor="#eff3f8">


    <!--[if gte mso 10]>
    <table width="680" border="0" cellspacing="0" cellpadding="0">
      <tr><td>
    <![endif]-->

    <table border="0" cellspacing="0" cellpadding="0" class="table_width_100" width="100%" style="max-width: 680px; min-width: 300px;">
      <tr><td>
        <!-- padding --><div style="height: 40px; line-height: 40px; font-size: 10px;">&nbsp;</div>
      </td></tr>
      <!--header -->
      <tr><td align="center" bgcolor="#ffffff">
        <!-- padding --><div style="height: 40px; line-height: 40px; font-size: 10px;">&nbsp;</div>
        <table width="90%" border="0" cellspacing="0" cellpadding="0">
          <tr><td align="center">
            <a href="#" target="_blank" style="color: #596167; font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
              <font face="Arial, Helvetica, sans-seri; font-size: 13px;" size="3" color="#596167">
                <img :src="payment.sender.image" height="19" alt="Metronic" border="0" style="display: block;" /></font></a>
          </td>
          </tr>
        </table>
        <!-- padding --><div style="height: 40px; line-height: 40px; font-size: 10px;">&nbsp;</div>
      </td></tr>
      <!--header END-->

      <!--promo -->
      <tr><td align="center" bgcolor="#ffffff">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr><td align="center">
            <a href="#" target="_blank" style="color: #596167; font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
              <font face="Arial, Helvetica, sans-seri; font-size: 13px;" size="3" color="#596167">
                <img src="http://artloglab.com/metromail-shop/images/promo.jpg" width="680" alt="Promo" border="0" style="display: block; width: 100%; height: auto;" /></font></a>
          </td>
          </tr>
        </table>
      </td></tr>
      <!--promo END-->

      <!--goods -->
      <tr><td align="center" bgcolor="#ffffff">
        <table width="90%" border="0" cellspacing="0" cellpadding="0">
          <tr><td align="center">
            <!-- padding --><div style="height: 60px; line-height: 60px; font-size: 10px;">&nbsp;</div>

            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr><td align="center">
                <font face="Arial, Helvetica, sans-serif" size="5" color="#57697e" style="font-size: 22px;">
  <span style="font-family: Arial, Helvetica, sans-serif; font-size: 22px; color: #57697e; text-transform: uppercase;">
  Your products
</span></font>
                <!-- padding --><div style="height: 40px; line-height: 40px; font-size: 10px;">&nbsp;</div>
              </td></tr>
            </table>

            <table width="100%" border="0" cellspacing="0" cellpadding="0" v-for="product in payment.products">
              <tr><td align="center">

                <div class="mob_100" style="float: left; display: inline-block; width: 90%;">
                  <table class="mob_100" width="100%" border="0" cellspacing="0" cellpadding="0" align="left" style="border-collapse: collapse;">
                    <tr><td align="center" style="line-height: 14px; padding: 0 25px;">
                      <div style="border-width: 1px; border-style: solid; border-color: #eff2f4;">
                        <div style="line-height: 14px;">
                          <a href="#" target="_blank" style="color: #596167; font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
                            <font face="Arial, Helvetica, sans-seri; font-size: 13px;" size="3" color="#596167">
                              <img :src="product.image" width="100" alt="Goods 1" border="0" style="display: block; height: 100;" /></font></a>
                        </div>
                        <!-- padding --><div style="height: 20px; line-height: 20px; font-size: 10px;">&nbsp;</div>
                        <div style="line-height: 21px; padding: 0 10px;">
                          <font face="Arial, Helvetica, sans-serif" size="3" color="#727272" style="font-size: 15px;">
  <span style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #727272; text-transform: uppercase;">
  <a href="#" target="_blank" style="color: #727272; text-decoration: none;">{{product.name}}</a>
</span></font>
                        </div>
                        <!-- padding --><div style="height: 5px; line-height: 5px; font-size: 10px;">&nbsp;</div>
                        <div style="line-height: 21px; padding: 0 10px;">
                          <font face="Arial, Helvetica, sans-serif" size="5" color="#727272" style="font-size: 18px;">
                            <strong style="font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 18px; color: #727272;">
                              {{product.price}} Lei
                            </strong></font>
                        </div>
                        <!-- padding --><div style="height: 30px; line-height: 30px; font-size: 10px;">&nbsp;</div>
                      </div>
                      <!-- padding --><div style="height: 50px; line-height: 50px; font-size: 10px;">&nbsp;</div>
                    </td></tr>
                  </table>
                </div>

              </td></tr>
            </table>
          </td></tr>
          <tr><td><!-- padding --><div style="height: 10px; line-height: 10px; font-size: 10px;">&nbsp;</div></td></tr>
        </table>
      </td></tr>
      <!--goods END-->

      <!--pre-footer -->
      <tr><td class="iage_footer" align="center" bgcolor="#fcfafb" style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #e8e8e8;">
        <!-- padding --><div style="height: 40px; line-height: 40px; font-size: 10px;">&nbsp;</div>

        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr><td align="center">
            <div style="line-height: 27px;">
              <font face="Arial, Helvetica, sans-serif" size="3" color="#717171" style="font-size: 27px;">
  <span style="font-family: Arial, Helvetica, sans-serif; font-size: 27px; color: #717171;">
  Need help? Call us!
</span></font>
            </div>
            <!-- padding --><div style="height: 25px; line-height: 25px; font-size: 10px;">&nbsp;</div>
            <div style="line-height: 27px;">
              <font face="Arial, Helvetica, sans-serif" size="3" color="#f54c57" style="font-size: 27px;">
                <strong style="font-family: Arial, Helvetica, sans-serif; font-size: 27px; color: #f54c57;">
                  +40748524075
                </strong></font>
            </div>
          </td></tr>
        </table>

        <!-- padding --><div style="height: 40px; line-height: 40px; font-size: 10px;">&nbsp;</div>
      </td></tr>
      <!--pre-footer END-->

      <!--footer -->
      <tr><td class="iage_footer" align="center" bgcolor="#fcfafb" style="border-top-width: 1px; border-top-style: solid; border-top-color: #ffffff;">
        <!-- padding --><div style="height: 30px; line-height: 30px; font-size: 10px;">&nbsp;</div>

        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr><td align="center">
            <font face="Arial, Helvetica, sans-serif" size="3" color="#717171" style="font-size: 13px;">
  <span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #717171;">
  2015 &copy; Techfest
</span></font>
          </td></tr>
        </table>

        <!-- padding --><div style="height: 30px; line-height: 30px; font-size: 10px;">&nbsp;</div>
      </td></tr>
      <!--footer END-->
      <tr><td>
        <!-- padding --><div style="height: 40px; line-height: 40px; font-size: 10px;">&nbsp;</div>
      </td></tr>
    </table>
    <!--[if gte mso 10]>
    </td></tr>
    </table>
    <![endif]-->

  </td></tr>
  </table>

</div>
</html>
