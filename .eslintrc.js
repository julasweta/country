{
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "semi": true,
        "printWidth": 80,
        "trailingComma": "es5",
        "arrowParens": "avoid",
        "endOfLine": "auto",
        "proseWrap": "preserve",
        "overrides": [
          {
            "files": "*.ts",
            "options": {
              "printWidth": 100
            }
          }
        ]
      }
    ];
  }
}
