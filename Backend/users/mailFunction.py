from django.core.mail import send_mail
from smtplib import SMTPException
from django.template.loader import render_to_string
from Backend.settings import EMAIL_HOST_USER

def sendNewUserEmail(user):
    subject = "Welcome to EventFinder"
    recipient = [user.email]

    text_content = render_to_string(
        "users/newUserEmail.txt",{"user": user}
    )
    html_content = render_to_string(
        "users/newUserEmail.html",{"user": user}
    )

    try:
        send_mail(
            subject,
            text_content,
            EMAIL_HOST_USER,
            recipient,
            html_message=html_content,
            fail_silently=False,
        )

    except SMTPException as e:
        print("error:", e)
        raise Exception("Unable to send email")