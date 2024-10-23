document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const phoneInput = document.getElementById('phone-number');

    // Toastr configuration
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    // Phone number formatting
    phoneInput.addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = !x[2] ? '+' + x[1] : '+' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phoneNumber = document.getElementById('phone-number').value;
        const age = document.getElementById('age').value;

        const data = {
            name: name,
            phone_number: phoneNumber,
            age: parseInt(age, 10),
            clients_comment: "" // You can add this field to your form if needed
        };

        fetch('http://localhost:8081/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            toastr.success('Ro\'yxatdan o\'tish muvaffaqiyatli yakunlandi!', 'Muvaffaqiyat');
            form.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            toastr.error('Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.', 'Xato');
        });
    });
});