<div id="botLtContent">
  <h1 class="contactForm">Let's start a conversation!</h1>
  <p>Give us a call at (415) 357-1875 or if you prefer email correspondence, you can use this form. Tell us what you're starting with and what you want to get done. We can provide free estimates and work with you to define a specific solution that will get you exactly what you need as quickly and efficiently as possible.</p>
  <form id="contactForm" action="/lib/php/FormToEmail.php" method="post">
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td class="colOneOfThree label"><label for="name">Name: <span>*</span></label></td>
        <td class="colTwoOfThree"><input class="txt" type="text" size="30" name="name" class="errorField"></td>
        <td class="third"><span id="nameMessage"></span></td>
      </tr>
      <tr>
        <td class="label"><label for="email">E-mail: <span>*</span></label></td>
        <td class="colTwoOfThree"><input class="txt" type="text" size="30" name="email" class="errorField"></td>
        <td class="third"><span id="emailMessage"></span></td>
      </tr>
      <tr>
        <td class="label"><label for="phone">Phone:</label></td>
        <td colspan="2"><input class="txt" type="text" size="30" name="phone"></td>
      </tr>
      <tr>
        <td class="label">Preferred Method:</td>
        <td colspan="2">
          <input class="radio" id="methodEmail" type="radio" name="preferred Contact Method" value="e-mail"><label class="radio" for="methodEmail">E-mail</label>
          <input class="radio" id="methodTel" type="radio" name="preferred Contact Method" value="telephone"><label class="radio" for="methodTel">Telephone</label>
        </td>
      </tr>
      <tr>
        <td class="label">Subject:</td>
        <td class="chkbx colTwoOfThree">
          <input id="subGeneral" type="checkbox" name="subject[]" value="General Inquiry"><label class="chbx" for="subGeneral">General Inquiry</label>
        </td>
        <td class="chkbx">
          <input id="subEmp" type="checkbox" name="subject[]" value="Employment Opportunity"><label class="chbx" for="subEmp">Employment Opportunities</label>
        </td>
      </tr>
      <tr>
        <td></td>
        <td class="chkbx colTwoOfThree">
          <input id="subPackServ" type="checkbox" name="subject[]" value="DesignMap Packaged Services"><label class="chbx" for="subPackServ">DesignMap Packaged Services</label>
        </td>
        <td class="chkbx">
          <input id="subOther" type="checkbox" name="subject[]" value="Other"><label class="chbx" for="subOther">Other</label>
        </td>
      </tr>
      <tr>
        <td></td>
        <td class="chkbx colTwoOfThree">
          <input id="subInfoReq" type="checkbox" name="subject[]" value="Request for Information"><label class="chbx" for="subInfoReq">Request for Information</label>
        </td>
        <td></td>
      </tr>  
      <tr>
        <td class="label">Message:</td>
        <td colspan="2"><textarea name="comments" rows="6" cols="30"></textarea></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td colspan="2"><input id="sbmt" class="off" type="image" src="images/transPix.gif" value="Submit"><span id="sbmtMessage"></span></td>
      </tr>
    </table>
  </form>
</div>