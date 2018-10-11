package com.example.praneeth.firebaseauthapp;

import android.app.ProgressDialog;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class MainActivity extends AppCompatActivity implements View.OnClickListener{

    private Button buttonregister;
    private EditText Firstname;
    private EditText Lastname;
    private EditText editTextEmail;
    private EditText editTextPassword;
    private TextView textViewSignin;
    private ProgressDialog progressDialog;
    private FirebaseAuth firebaseAuth;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        firebaseAuth = FirebaseAuth.getInstance();
        if (firebaseAuth.getCurrentUser() != null)
        {
            // Go to Home Activity
            finish();
            startActivity(new Intent(getApplicationContext(), HomeActivity.class));
        }
        progressDialog = new ProgressDialog(this);

        buttonregister = (Button) findViewById(R.id.ButtonRegister);
        editTextEmail = (EditText) findViewById(R.id.editTextEmail);
        Firstname = (EditText) findViewById(R.id.firstName);
        Lastname = (EditText) findViewById(R.id.lastName);
        editTextPassword = (EditText) findViewById(R.id.editTextPassword);
        textViewSignin = (TextView) findViewById(R.id.textViewSignin);

        buttonregister.setOnClickListener(this);
        textViewSignin.setOnClickListener(this);

    }
    private void registerUser()
    {

        String email = editTextEmail.getText().toString().trim();
        String password = editTextPassword.getText().toString().trim();
        String first = Firstname.getText().toString().trim();
        String last = Lastname.getText().toString().trim();

        if(TextUtils.isEmpty(first))
        {
            //First Name is empty
            Toast.makeText(this, "Please Enter Your First Name", Toast.LENGTH_SHORT).show();
            //stopping the execution of the function
            return;
        }

        if(TextUtils.isEmpty(last))
        {
            //Last Name is empty
            Toast.makeText(this, "Please Enter Your Last Name", Toast.LENGTH_SHORT).show();
            //stopping the execution of the function
            return;
        }
       if(TextUtils.isEmpty(email))
       {
           //email is empty
           Toast.makeText(this, "Please Enter Your Email", Toast.LENGTH_SHORT).show();
           //stopping the execution of the function
           return;
       }

        if(TextUtils.isEmpty(password))
        {
            //password is empty
            Toast.makeText(this, "Please Enter Your Password", Toast.LENGTH_SHORT).show();
            //stopping the execution of the function
            return;
        }
        progressDialog.setMessage("Registering User ...");
        progressDialog.show();

        firebaseAuth.createUserWithEmailAndPassword(email,password)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful())
                        {
                            Toast.makeText(MainActivity.this, "Registered Successfully ", Toast.LENGTH_SHORT).show();
                            // Go to Home Activity
                            finish();
                            startActivity(new Intent(getApplicationContext(), HomeActivity.class));
                        }
                        else{
                            Toast.makeText(MainActivity.this, "Could not register.. please try again ", Toast.LENGTH_SHORT).show();

                        }
                        progressDialog.dismiss();

                    }
                });
    }

    @Override
    public void onClick(View view)
    {
       if (view == buttonregister)
       {
           registerUser();
       }
        if (view == textViewSignin)
        {
            startActivity(new Intent(this, LoginActivity.class));
        }
    }
}
