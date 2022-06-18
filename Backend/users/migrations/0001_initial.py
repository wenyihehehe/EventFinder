# Generated by Django 4.0.5 on 2022-06-13 12:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import users.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('profileImage', models.ImageField(blank=True, default='DefaultProfileImage.png', null=True, upload_to=users.models.user_directory_path)),
                ('firstName', models.CharField(blank=True, default='-', max_length=50, null=True)),
                ('lastName', models.CharField(blank=True, default='-', max_length=50, null=True)),
                ('contactNumber', models.CharField(blank=True, max_length=11, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(blank=True, max_length=100, null=True)),
                ('coverImage', models.ImageField(blank=True, default='DefaultCoverImage.png', null=True, upload_to=users.models.event_directory_path)),
                ('type', models.CharField(blank=True, max_length=10, null=True)),
                ('category', models.CharField(blank=True, max_length=20, null=True)),
                ('location', models.TextField(blank=True, max_length=400, null=True)),
                ('latitude', models.FloatField(blank=True, null=True)),
                ('longitude', models.FloatField(blank=True, null=True)),
                ('startDateTime', models.DateTimeField(blank=True, null=True)),
                ('endDateTime', models.DateTimeField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('status', models.CharField(choices=[('Draft', 'Draft'), ('Published', 'Published'), ('Ended', 'Ended')], default='Draft', max_length=9)),
                ('soft_delete', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('orderDateTime', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('Active', 'Active'), ('Completed', 'Completed')], default='Active', max_length=9)),
                ('eventId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='registration', to='users.event')),
                ('userId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='registration', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TicketType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=10)),
                ('type', models.CharField(max_length=10)),
                ('quantity', models.PositiveIntegerField()),
                ('price', models.PositiveIntegerField()),
                ('eventId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ticketType', to='users.event')),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('status', models.BooleanField(default=False)),
                ('registration', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ticket', to='users.registration')),
                ('ticketType', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ticket', to='users.tickettype')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('rating', models.IntegerField()),
                ('comment', models.CharField(max_length=200)),
                ('postedDate', models.DateField(auto_now_add=True)),
                ('registrationId', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='review', to='users.registration')),
            ],
        ),
        migrations.CreateModel(
            name='OrganizerProfile',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('organizerName', models.CharField(max_length=50)),
                ('profileImage', models.ImageField(blank=True, default='DefaultOrganizerProfileImage.png', null=True, upload_to=users.models.organizer_directory_path)),
                ('contactEmail', models.EmailField(blank=True, max_length=254, null=True, unique=True, verbose_name='email address')),
                ('description', models.CharField(max_length=500)),
                ('userId', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EventPageVisit',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('visits', models.PositiveIntegerField(default=0)),
                ('eventId', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='users.event')),
            ],
        ),
        migrations.CreateModel(
            name='EventImage',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('eventId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='image', to='users.event')),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='organizerId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event', to='users.organizerprofile'),
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('address', models.CharField(max_length=100)),
                ('address2', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=50)),
                ('country', models.CharField(choices=[('Malaysia', 'Malaysia')], max_length=8)),
                ('postalCode', models.CharField(max_length=5)),
                ('state', models.CharField(choices=[('Johor', 'Johor'), ('Kedah', 'Kedah'), ('Kelantan', 'Kelantan'), ('Malacca', 'Malacca'), ('Negeri Sembilan', 'Negeri Sembilan'), ('Pahang', 'Pahang'), ('Penang', 'Penang'), ('Perak', 'Perak'), ('Perlis', 'Perlis'), ('Sabah', 'Sabah'), ('Sarawak', 'Sawarak'), ('Selangor', 'Selangor'), ('Terengganu', 'Terengganu'), ('Kuala Lumpur', 'Kuala Lumpur'), ('Labuan', 'Labuan'), ('Putrajaya', 'Putrajaya')], max_length=15)),
                ('userId', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
