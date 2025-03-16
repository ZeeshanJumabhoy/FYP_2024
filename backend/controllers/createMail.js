export default function createMail(type, args) {
    switch (type) {
        case 'otpMail':
            return getOTPMailTemplate(args);
        case 'registerMail':
            return getRegisterMailTemplate(args);
        case 'bloodrequest':
            return getBloodRequestMailTemplate(args);
        case 'interestbloodgiving':
            return sendBloodRequestEmails(args);
        case 'appointmentconfirmation':
            return appointmentconfirmation(args);
        case 'bloodbankcredentails':
            return bloodbankcredentials(args); 
        case 'UpdateRequestStatusSendingToDonor':
            return UpdateRequestStatusSendingToDonor(args);
        case 'UpdateRequestStatusSendingToRequestor':
            return UpdateRequestStatusSendingToRequestor(args);        
            
        default:
            return null;
    }
}

function getOTPMailTemplate(args) {
    const { otp } = args;
    return `
    <!DOCTYPE html><html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&amp;display=swap" rel="stylesheet" type="text/css"><!--<![endif]--><style> *{box-sizing:border-box}body{margin:0;padding:0}a[x-apple-data-detectors]{color:inherit !important;text-decoration:inherit !important}#MessageViewBody a{color:inherit;text-decoration:none}p{line-height:inherit}.desktop_hide,.desktop_hide table{mso-hide:all;display:none;max-height:0;overflow:hidden}.image_block img+div{display:none}@media (max-width:720px){.social_block.desktop_hide .social-table{display:inline-block !important}.mobile_hide{display:none}.row-content{width:100% !important}.stack .column{width:100%;display:block}.mobile_hide{min-height:0;max-height:0;max-width:0;overflow:hidden;font-size:0}.desktop_hide,.desktop_hide table{display:table !important;max-height:none !important}.row-3 .column-1 .block-1.spacer_block{height:20px !important}.row-2 .column-1 .block-1.text_block td.pad{padding:10px 5px 5px !important}.row-2 .column-1 .block-2.text_block td.pad{padding:20px 0 !important}}</style></head><body style="background-color:#fff;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none"><table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff"><tbody><tr><td><table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#7700bd;background-size:auto"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-size:auto;border-radius:0;color:#000;width:700px;margin:0 auto" width="700"><tbody><tr><td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-top:40px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad"><div style="font-family:Arial,sans-serif"><div class
    style="font-size:12px;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;mso-line-height-alt:14.399999999999999px;color:#fff;line-height:1.2"><p
    style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"><span
    style="font-size:30px;"><strong>Blood Safe Life</strong></span></p></div></div></td></tr></table><table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad" style="padding-bottom:30px;padding-left:20px;padding-right:20px;padding-top:10px"><div style="font-family:Arial,sans-serif"><div class
    style="font-size:12px;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;mso-line-height-alt:18px;color:#fff;line-height:1.5"><p
    style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:21px">Thank you for choosing Blood Safe Life.<br>Use the following OTP to reset your password.</p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:700px;margin:0 auto" width="700"><tbody><tr><td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:25px;padding-top:25px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="text_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad" style="padding-bottom:5px;padding-left:5px;padding-right:5px;padding-top:30px"><div style="font-family:Arial,sans-serif"><div class
    style="font-size:14px;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;mso-line-height-alt:16.8px;color:#555;line-height:1.2"><p
    style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"><span style="font-size:18px;">Your OTP
                                                                                    is,</span></p></div></div></td></tr></table><table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad" style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:20px"><div style="font-family:Arial,sans-serif"><div class
    style="font-size:12px;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;mso-line-height-alt:14.399999999999999px;color:#7700bd;line-height:1.2"><p
    style="margin:0;font-size:12px;text-align:center;mso-line-height-alt:14.399999999999999px;letter-spacing:10px"><span style="font-size:58px;"><strong><span
    style>${otp}</span></strong></span></p></div></div></td></tr></table><div class="spacer_block block-3" style="height:60px;line-height:60px;font-size:1px">&#8202;</div><table class="social_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td class="pad"><div class="alignment" align="center"><table class="social-table" width="208px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;display:inline-block"><tr><td style="padding:0 10px 0 10px"><a
    href="https://www.facebook.com/profile.php?id=100013725934297" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/facebook@2x.png" width="32" height="32" alt="Facebook" title="Facebook" style="display:block;height:auto;border:0"></a></td><td style="padding:0 10px 0 10px"><a
    href="https://www.linkedin.com/in/RAJ4823/" target="_blank"><img
    src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/linkedin@2x.png" width="32" height="32" alt="LinkedIn" title="LinkedIn" style="display:block;height:auto;border:0"></a></td><td style="padding:0 10px 0 10px"><a
    href="https://www.instagram.com/raj._.4/" target="_blank"><img
    src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/instagram@2x.png" width="32" height="32" alt="Instagram" title="Instagram" style="display:block;height:auto;border:0"></a></td><td style="padding:0 10px 0 10px"><a href="https://twitter.com/intent/tweet?url=https://twitter.com/RAJ4823" target="_blank"><img
    src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/twitter@2x.png" width="32" height="32" alt="Twitter" title="Twitter" style="display:block;height:auto;border:0"></a></td></tr></table></div></td></tr></table><table class="text_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad"><div style="font-family:Arial,sans-serif"><div class
    style="font-size:12px;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;mso-line-height-alt:14.399999999999999px;color:#171717;line-height:1.2"><p
    style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"><span style="font-size:12px;"><strong>Our
                                                                                        mailing address:</strong></span></p><p
    style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"><span
    style="font-size:12px;">Blood Safe Life.help@gmail.com</span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#7500ba"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:700px;margin:0 auto" width="700"><tbody><tr><td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:25px;padding-top:25px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px">&#8202;</div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>
    `;
}

function getRegisterMailTemplate(args) {
    const { username } = args;
    return `
    <!DOCTYPE html><html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700;900&amp;display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&amp;display=swap" rel="stylesheet" type="text/css"><!--<![endif]--><style> *{box-sizing:border-box}body{margin:0;padding:0}a[x-apple-data-detectors]{color:inherit !important;text-decoration:inherit !important}#MessageViewBody a{color:inherit;text-decoration:none}p{line-height:inherit}.desktop_hide,.desktop_hide table{mso-hide:all;display:none;max-height:0;overflow:hidden}.image_block img+div{display:none}@media (max-width:720px){.social_block.desktop_hide .social-table{display:inline-block !important}.mobile_hide{display:none}.row-content{width:100% !important}.stack .column{width:100%;display:block}.mobile_hide{min-height:0;max-height:0;max-width:0;overflow:hidden;font-size:0}.desktop_hide,.desktop_hide table{display:table !important;max-height:none !important}.row-2 .column-1 .block-1.text_block td.pad,.row-2 .column-1 .block-2.text_block td.pad{padding:10px 5px 5px !important}.row-3 .column-1 .block-1.spacer_block{height:20px !important}}</style></head><body style="background-color:#fff;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none"><table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff"><tbody><tr><td><table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#7700bd;background-size:auto"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-size:auto;border-radius:0;color:#000;width:700px;margin:0 auto" width="700"><tbody><tr><td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:30px;padding-top:30px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad"><div style="font-family:Arial,sans-serif"><div class
    style="font-size:12px;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;mso-line-height-alt:14.399999999999999px;color:#fff;line-height:1.2"><p
    style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"><span style="font-size:30px;"><strong>Welcome
                                                                                        to Blood Safe Life!</strong></span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:700px;margin:0 auto" width="700"><tbody><tr><td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:25px;padding-top:25px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="text_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad" style="padding-bottom:15px;padding-left:5px;padding-right:5px;padding-top:20px"><div
    style="font-family:'Trebuchet MS',Tahoma,sans-serif"><div class
    style="font-size:14px;font-family:Montserrat,'Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif;mso-line-height-alt:16.8px;color:#8400d1;line-height:1.2"><p
    style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"><span
    style="font-size:30px;"><strong>${username}</strong></span></p></div></div></td></tr></table><table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad" style="padding-bottom:5px;padding-left:5px;padding-right:5px;padding-top:10px"><div style="font-family:Arial,sans-serif"><div class
    style="font-size:12px;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;mso-line-height-alt:14.399999999999999px;color:#555;line-height:1.2"><p
    style="margin:0;font-size:12px;text-align:center;mso-line-height-alt:14.399999999999999px"><span style="font-size:15px;">You have
                                                                                    successfully registered, </span></p><p
    style="margin:0;font-size:12px;text-align:center;mso-line-height-alt:14.399999999999999px"><span style="font-size:15px;">and you are
                                                                                    now one of the SUPER-verse
                                                                                    pioneers!&nbsp;</span></p></div></div></td></tr></table><div class="spacer_block block-3" style="height:60px;line-height:60px;font-size:1px">&#8202;</div><table class="social_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td class="pad"><div class="alignment" align="center"><table class="social-table" width="208px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;display:inline-block"><tr><td style="padding:0 10px 0 10px"><a
    href="https://www.facebook.com/profile.php?id=100013725934297" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/facebook@2x.png" width="32" height="32" alt="Facebook" title="Facebook" style="display:block;height:auto;border:0"></a></td><td style="padding:0 10px 0 10px"><a
    href="https://www.linkedin.com/in/RAJ4823/" target="_blank"><img
    src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/linkedin@2x.png" width="32" height="32" alt="LinkedIn" title="LinkedIn" style="display:block;height:auto;border:0"></a></td><td style="padding:0 10px 0 10px"><a
    href="https://www.instagram.com/raj._.4/" target="_blank"><img
    src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/instagram@2x.png" width="32" height="32" alt="Instagram" title="Instagram" style="display:block;height:auto;border:0"></a></td><td style="padding:0 10px 0 10px"><a href="https://twitter.com/intent/tweet?url=https://twitter.com/RAJ4823" target="_blank"><img
    src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/twitter@2x.png" width="32" height="32" alt="Twitter" title="Twitter" style="display:block;height:auto;border:0"></a></td></tr></table></div></td></tr></table><table class="text_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad"><div style="font-family:Arial,sans-serif"><div class
    style="font-size:12px;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;mso-line-height-alt:14.399999999999999px;color:#171717;line-height:1.2"><p
    style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"><span style="font-size:12px;"><strong>Our
                                                                                        mailing address:</strong></span></p><p
    style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"><span
    style="font-size:12px;">Blood Safe Life.help@gmail.com</span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#7500ba"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:700px;margin:0 auto" width="700"><tbody><tr><td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:25px;padding-top:25px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px">&#8202;</div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html> 
    `;
}

function getBloodRequestMailTemplate(args) {
    console.log(args);
    const { username } = args;
    return `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!--[if mso]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            <o:AllowPNG/>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700;900&amp;display=swap" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&amp;display=swap" rel="stylesheet" type="text/css">
    <!--<![endif]-->
    <style>
        * { box-sizing: border-box }
        body { margin: 0; padding: 0 }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important }
        #MessageViewBody a { color: inherit; text-decoration: none }
        p { line-height: inherit }
        .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0; overflow: hidden }
        .image_block img+div { display: none }
        @media (max-width:720px) {
            .social_block.desktop_hide .social-table { display: inline-block !important }
            .mobile_hide { display: none }
            .row-content { width: 100% !important }
            .stack .column { width: 100%; display: block }
            .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important }
        }
    </style>
</head>
<body style="background-color:#fff;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#fff">
        <tbody>
            <tr>
                <td>
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#7700bd;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color:#000;width:700px;margin:0 auto">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%" style="padding-bottom:30px;padding-top:30px;vertical-align:top;">
                                                    <table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="font-family:Arial,sans-serif">
                                                                    <div style="font-size:12px;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;color:#fff;line-height:1.2">
                                                                        <p style="margin:0;font-size:14px;text-align:center;">
                                                                            <span style="font-size:30px;"><strong>Blood Safe Life</strong></span>
                                                                        </p>
                                                                        <p style="margin:0;font-size:16px;text-align:center;">Your Blood Request Has Been Sent</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color:#000;width:700px;margin:0 auto">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%" style="padding-bottom:25px;padding-top:25px;vertical-align:top;">
                                                    <table class="text_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                        <tr>
                                                            <td class="pad" style="padding:10px;">
                                                                <div style="font-family:'Trebuchet MS',Tahoma,sans-serif">
                                                                    <div style="font-size:14px;font-family:Montserrat,'Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif;color:#8400d1;line-height:1.2;text-align:center;">
                                                                        <p style="margin:0;font-size:14px;"><strong>Hello, ${username}</strong></p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                        <tr>
                                                            <td class="pad" style="padding:15px 5px;">
                                                                <div style="font-family:Arial,sans-serif">
                                                                    <div style="font-size:12px;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;color:#555;line-height:1.5;text-align:center;">
                                                                        <p style="margin:0;font-size:16px;">
                                                                            We understand that every second counts, and we’re here to support you. Your blood request has been shared with our community of donors. We’re hopeful you’ll receive the assistance you need during this critical time.
                                                                        </p>
                                                                        <p style="margin:0;font-size:16px;">
                                                                            Remember, Blood Safe Life is here for you, and our network is actively reaching out to potential donors.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div class="spacer_block block-3" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
                                                    <table class="social_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center">
                                                                    <table class="social-table" width="208px" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                        <tr>
                                                                            <td style="padding:0 10px;"><a href="https://www.facebook.com/profile.php?id=100013725934297" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/facebook@2x.png" width="32" height="32" alt="Facebook" title="Facebook" style="display:block;height:auto;border:0"></a></td>
                                                                            <td style="padding:0 10px;"><a href="https://www.linkedin.com/in/RAJ4823/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/linkedin@2x.png" width="32" height="32" alt="LinkedIn" title="LinkedIn" style="display:block;height:auto;border:0"></a></td>
                                                                            <td style="padding:0 10px;"><a href="https://www.instagram.com/raj._.4/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/instagram@2x.png" width="32" height="32" alt="Instagram" title="Instagram" style="display:block;height:auto;border:0"></a></td>
                                                                            <td style="padding:0 10px;"><a href="https://twitter.com/intent/tweet?url=https://twitter.com/RAJ4823" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/twitter@2x.png" width="32" height="32" alt="Twitter" title="Twitter" style="display:block;height:auto;border:0"></a></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="text_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="font-family:Arial,sans-serif">
                                                                    <div style="font-size:12px;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;color:#171717;line-height:1.5;text-align:center;">
                                                                        <p style="margin:0;font-size:14px;">
                                                                            <strong>Our mailing address:</strong><br>
                                                                            123 Blood Safe Street, Safe City, SC 12345
                                                                        </p>
                                                                        <p style="margin:0;font-size:12px;">Need further help? <a href="mailto:support@bloodsafelife.com">Contact us</a></p>
                                                                        <p style="margin:0;font-size:12px;color:#555;">If you did not make this request, you may safely ignore this email.</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div class="spacer_block block-6" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>
`;

}

function sendBloodRequestEmails(args) {
    const { username, bloodGroup, units, urgency, specialRequirements, medicalReason, transfusionDateTime, hospitalName } = args;
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: 'Open Sans', sans-serif; background-color: #f9f9f9; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            .header { background-color: #ff4d4d; color: #fff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 20px; }
            .content p { font-size: 16px; line-height: 1.6; }
            .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            .table th { background-color: #f2f2f2; font-weight: bold; }
            .cta { margin-top: 20px; text-align: center; }
            .cta a { background-color: #ff4d4d; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px; }
            .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Urgent Blood Request for</h1>
            </div>
            <div class="content">
                <p>Dear ${username},</p>
                <p>A patient in need is reaching out to compassionate individuals like you. Every drop of blood you donate can be a lifeline, offering a chance for someone to embrace life again. Together, we can make a difference and provide hope where it's most needed.</p>
                <table class="table">
                    <tr><th>Blood Group</th><td>${bloodGroup}</td></tr>
                    <tr><th>Required Units</th><td>${units}</td></tr>
                    <tr><th>Urgency</th><td>${urgency}</td></tr>
                    <tr><th>Special Requirements</th><td>${specialRequirements || 'None'}</td></tr>
                    <tr><th>Medical Reason</th><td>${medicalReason}</td></tr>
                    <tr><th>Transfusion Date & Time</th><td>${transfusionDateTime}</td></tr>
                    <tr><th>Hospital Name</th><td>${hospitalName}</td></tr>
                </table>
                <div class="cta">
                    <p>If you are able to help, please consider donating your blood. Together, we can bring hope back into their lives.</p>
                    <a href="https://yourdonationlink.com" target="_blank">Donate Now</a>
                </div>
            </div>
            <div class="footer">
                <p>Thank you for being a beacon of hope in our community.</p>
                <p>Contact us at: BloodSafeLife.help@gmail.com</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

function appointmentconfirmation(args) {
    const { username, bloodBankName, timeslot, date, day } = args;
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: 'Open Sans', sans-serif; background-color: #f9f9f9; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            .header { background-color: #ff4d4d; color: #fff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 20px; }
            .content p { font-size: 16px; line-height: 1.6; }
            .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            .table th { background-color: #f2f2f2; font-weight: bold; }
            .cta { margin-top: 20px; text-align: center; }
            .cta a { background-color: #ff4d4d; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px; }
            .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Blood Donation Appointment Confirmed</h1>
            </div>
            <div class="content">
                <p>Dear ${username},</p>
                <p>Thank you for your generous commitment to donating blood. Your appointment has been successfully scheduled. Your donation can save lives, and we truly appreciate your compassion.</p>
                <table class="table">
                    <tr><th>Blood Bank Name</th><td>${bloodBankName}</td></tr>
                    <tr><th>Appointment Date</th><td>${date}, ${day}</td></tr>
                    <tr><th>Time Slot</th><td>${timeslot}</td></tr>
                </table>
                <div class="cta">
                    <p>If you need to make any changes or have questions, please don’t hesitate to reach out.</p>
                    <a href="https://yourappointmentlink.com" target="_blank">Manage Your Appointment</a>
                </div>
            </div>
            <div class="footer">
                <p>Thank you for making a difference in someone’s life. Together, we’re saving lives.</p>
                <p>Contact us at: BloodSafeLife.help@gmail.com</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

function bloodbankcredentials(args) {
    const { username, bloodbankemail, password } = args;
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: 'Open Sans', sans-serif; background-color: #f9f9f9; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            .header { background-color: #ff4d4d; color: #fff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 22px; }
            .content { padding: 20px; text-align: left; }
            .content p { font-size: 16px; line-height: 1.6; margin: 10px 0; }
            .credentials { background-color: #f2f2f2; padding: 15px; border-radius: 8px; margin-top: 10px; }
            .credentials p { margin: 5px 0; font-weight: bold; }
            .cta { margin-top: 20px; text-align: center; }
            .cta a { background-color: #ff4d4d; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px; font-weight: bold; }
            .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
            .note { font-size: 14px; color: #777; margin-top: 15px; }
            .warning { font-size: 14px; color: #d9534f; font-weight: bold; margin-top: 15px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to Blood Safe Life 🩸</h1>
            </div>
            <div class="content">
                <p>Dear ${username},</p>
                <p>We are pleased to inform you that your Blood Bank account has been successfully registered on <strong>Blood Safe Life</strong>.</p>
                <p>You can now log in using the credentials below:</p>
                <div class="credentials">
                    <p>Email: <span style="color:#ff4d4d;">${bloodbankemail}</span></p>
                    <p>Temporary Password: <span style="color:#ff4d4d;">${password}</span></p>
                </div>
                <p class="note">For security reasons, we strongly recommend updating your password upon your first login.</p>
                <p class="warning">⚠️ Do not share your credentials with anyone.</p>
                <p>If you need to reset your password, please contact our representative to receive a password reset link.</p>
                <div class="cta">
                    <a href="https://yourwebsite.com/login" target="_blank">Login Now</a>
                </div>
            </div>
            <div class="footer">
                <p>If you have any questions, feel free to reach out to us.</p>
                <p>Contact us at: <a href="mailto:BloodSafeLife.help@gmail.com">BloodSafeLife.help@gmail.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
}

function UpdateRequestStatusSendingToDonor(args) {
    const { status } = args;

    let message = "";

    if (status === "Interested") {
        message = `
            <p>You are just one step away from saving a life! ❤️</p>
            <p>Please visit the nearest Blood Bank center and donate blood to make a difference today.</p>
        `;
    } else if (status === "Under Screening") {
        message = `
            <p>Your donation appointment has been confirmed! ✅</p>
            <p>Thank you for your willingness to donate. Please ensure you arrive at the designated Blood Bank center on time.</p>
        `;
    } else if (status === "Completed") {
        message = `
            <p>Thank you for your life-saving donation! 🙏</p>
            <p>Your contribution has made a difference in someone's life. We truly appreciate your generosity.</p>
        `;
    } else {
        message = `
            <p>We have an update regarding your donation request.</p>
            <p>Please check your Blood Safe Life account for more details.</p>
        `;
    }

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: 'Open Sans', sans-serif; background-color: #f9f9f9; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            .header { background-color: #ff4d4d; color: #fff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 22px; }
            .content { padding: 20px; text-align: left; }
            .content p { font-size: 16px; line-height: 1.6; margin: 10px 0; }
            .cta { margin-top: 20px; text-align: center; }
            .cta a { background-color: #ff4d4d; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px; font-weight: bold; }
            .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Blood Safe Life - Donation Update 🩸</h1>
            </div>
            <div class="content">
                ${message}
                <div class="cta">
                    <a href="https://yourwebsite.com/login" target="_blank">View Details</a>
                </div>
            </div>
            <div class="footer">
                <p>If you have any questions, feel free to reach out to us.</p>
                <p>Contact us at: <a href="mailto:BloodSafeLife.help@gmail.com">BloodSafeLife.help@gmail.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
}

function UpdateRequestStatusSendingToRequestor(args) {
    const { status } = args;

    let message = "";

    if (status === "Interested") {
        message = `
            <p>Good news! A donor has shown interest in fulfilling your blood request. 🩸</p>
            <p>We appreciate your patience as they proceed with the donation process.</p>
            <p>Please stay in touch with the Blood Bank center for further updates.</p>
        `;
    } else if (status === "Under Screening") {
        message = `
            <p>The donor is currently undergoing the necessary screening process. 🔍</p>
            <p>We will notify you once the screening is completed and the donation is ready for collection.</p>
        `;
    } else if (status === "Completed") {
        message = `
            <p>Great news! The blood donation for your request has been successfully completed. 🎉</p>
            <p>Please coordinate with the Blood Bank for the collection of the donated blood.</p>
        `;
    } else {
        message = `
            <p>We have an update regarding your blood request. 📢</p>
            <p>Please check your Blood Safe Life account for more details.</p>
        `;
    }

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: 'Open Sans', sans-serif; background-color: #f9f9f9; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            .header { background-color: #ff4d4d; color: #fff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 22px; }
            .content { padding: 20px; text-align: left; }
            .content p { font-size: 16px; line-height: 1.6; margin: 10px 0; }
            .cta { margin-top: 20px; text-align: center; }
            .cta a { background-color: #ff4d4d; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px; font-weight: bold; }
            .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Blood Safe Life - Blood Request Update 🩸</h1>
            </div>
            <div class="content">
                ${message}
                <div class="cta">
                    <a href="https://yourwebsite.com/login" target="_blank">View Details</a>
                </div>
            </div>
            <div class="footer">
                <p>If you have any questions, feel free to reach out to us.</p>
                <p>Contact us at: <a href="mailto:BloodSafeLife.help@gmail.com">BloodSafeLife.help@gmail.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
}


