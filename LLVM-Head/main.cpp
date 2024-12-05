enum TokenKind : unsigned short {
    #define TOK(X) X,
    #include "./TokenKinds.def"
    NUM_TOKENS
};
