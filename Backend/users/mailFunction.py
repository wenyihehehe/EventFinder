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
        
def sendNewRegistrationEmail(registration,orders):
    subject = "Registration Confirmation Email"
    recipient = [registration.userId.email]
    orderAmount = sum([order['quantity'] * order['price'] for order in orders])

    text_content = render_to_string(
        "users/newRegistrationEmail.txt",{"registration": registration, "orders": orders, "orderAmount": orderAmount}
    )
    html_content = render_to_string(
        "users/newRegistrationEmail.html",{"registration": registration, "orders": orders, "orderAmount": orderAmount}
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

def sendResetPasswordEmail(reset_password_token):
    subject = "Password Reset - EventFinder"
    link = "http://localhost:3000/reset_password?token=" + reset_password_token.key
    recipient=[reset_password_token.user.email]

    text_content = render_to_string(
        "users/resetPasswordEmail.txt",{"link": link}
    )
    html_content = render_to_string(
        "users/resetPasswordEmail.html",{"link": link}
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