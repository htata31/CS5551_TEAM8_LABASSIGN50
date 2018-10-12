package com.example.praneeth.firebaseauthapp;

import android.app.ProgressDialog;
import android.content.Intent;
import android.nfc.Tag;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class LoginActivity extends AppCompatActivity implements View.OnClickListener{
    private Button buttonlogin;
    private EditText editTextEmail;
    private EditText editTextPassword;
    private TextView textViewSignUp;
    private ProgressDialog progressDialog;
    private FirebaseAuth firebaseAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        progressDialog = new ProgressDialog(this);
        firebaseAuth = FirebaseAuth.getInstance();
        if (firebaseAuth.getCurrentUser() != null)
        {
            // Go to Home Activity
            finish();
            startActivity(new Intent(getApplicationContext(), HomeActivity.class));
        }
        buttonlogin = (Button) findViewById(R.id.ButtonLogin);
        editTextEmail = (EditText) findViewById(R.id.editTextEmail);
        editTextPassword = (EditText) findViewById(R.id.editTextPassword);
        textViewSignUp = (TextView) findViewById(R.id.textViewSignUp);

        buttonlogin.setOnClickListener(this);
        textViewSignUp.setOnClickListener(this);
    }

    private void userLogin()
    {
        String email = editTextEmail.getText().toString().trim();
        String password = editTextPassword.getText().toString().trim();
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
        progressDialog.setMessage("User Logging...");
        progressDialog.show();
        firebaseAuth.signInWithEmailAndPassword(email,password)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        progressDialog.dismiss();
                        if (task.isSuccessful())
                        {
                            // Go to Home Activity
                            finish();
                            startActivity(new Intent(getApplicationContext(), HomeActivity.class));

                        }
                        else{
                            Toast.makeText(LoginActivity.this, "Could not Login.. please try again ", Toast.LENGTH_SHORT).show();
                            progressDialog.dismiss();


                        }
                    }
                });
    }
    @Override
    public void onClick(View view)
    {
        if (view == buttonlogin)
        {
            userLogin();
        }
        if (view == textViewSignUp)
        {
            finish();
            startActivity(new Intent(this, MainActivity.class));
        }
    }
}
