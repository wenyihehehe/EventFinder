import './index.css';

export default function SignUpModal(){
    return (
        <div class="d-flex justify-content-center mt-2">
            <div class="content">
            <div class="title">Sign up with email</div>
            <div class="description mt-1 mb-2">Already have an account? Sign In</div>
            <form>
                <label for="firstname" class="form-label label">First Name</label>
                <div class="input-group mb-3">
                <input type="text" class="form-control" id="firstname" />
                </div>
                <label for="lastname" class="form-label label">Last Name</label>
                <div class="input-group mb-3">
                <input type="text" class="form-control" id="lastname" />
                </div>
                <label for="contactnumber" class="form-label label">Contact Number</label>
                <div class="input-group mb-3">
                <input type="text" class="form-control" id="contactnumber" />
                </div>
                <label for="email" class="form-label label">Email Address</label>
                <div class="input-group mb-3">
                <input type="email" class="form-control" id="email" />
                </div>
                <label for="password" class="form-label label">Password</label>
                <div class="input-group mb-3">
                <input type="password" class="form-control" id="password" />
                </div>
            </form>
            <div class="form-check mt-1 mb-1">
                <input class="form-check-input" type="checkbox" value="" id="privacy"/>
                <label class="form-check-label policy" for="privacy">
                I agree to the Terms of Service and Privacy Policy
                </label>
            </div>
            <button type="submit" class="btn primaryButton mt-1" style={{width:"100%"}}>Submit</button>
            </div>
        </div>
    )
}