#include "cryptolib.h"
#include "aes.h"
#include "ecc.h"

#include "base64.h"
std::string EncodeBase64(byte* message, int length){
  std::string encoded;
  //CryptoPP::StringSource ss(message, length, true, new CryptoPP::Base64Encoder(new CryptoPP::StringSink(encoded)));
  CryptoPP::Base64Encoder encoder;
  encoder.Put(message, length);
  encoder.MessageEnd();

  auto size = encoder.MaxRetrievable();
  if(size){
    encoded.resize(size);
    encoder.Get((byte*)&encoded[0],encoded.size());
  }
  return encoded;
}
void DecodeBase64(std::string message, byte*& outMessage, int& outlength){
  std::string encoded;
  //CryptoPP::StringSource ss(message, length, true, new CryptoPP::Base64Encoder(new CryptoPP::StringSink(encoded)));
  CryptoPP::Base64Decoder decoder;
  decoder.Put((byte*)message.data(), message.size());
  decoder.MessageEnd();

  outlength = 0;
  auto size = decoder.MaxRetrievable();  
  if(size && size <= SIZE_MAX){
    outMessage = new byte[size];
    decoder.Get(outMessage, size);
    outlength = size;
  }
}

CryptoLib::CryptoLib(const std::string& cryptoType){
  if(cryptoType == "aes"){
    _crypto = new AESCrypto();
  }else if(cryptoType == "ecc"){
    _crypto = new ECCCrypto();
  }
}
CryptoLib::CryptoLib(CryptoType cryptoType){
  if(cryptoType == CryptoType::LIB_AES){
    _crypto = new AESCrypto();
  }else if(cryptoType == CryptoType::LIB_ECC){
    _crypto = new ECCCrypto();
  }
}
CryptoLib::CryptoLib(CryptoType cryptoType,const std::string& privateKeyFile, const std::string& publicKeyFile){
  if(cryptoType == CryptoType::LIB_AES){
    _crypto = new AESCrypto();
  }else if(cryptoType == CryptoType::LIB_ECC){
    _crypto = new ECCCrypto();
  }
  loadKey(privateKeyFile, publicKeyFile);
}

bool CryptoLib::genKey(const std::string& privateKeyFile, const std::string& publicKeyFile){
  return _crypto->genKey(privateKeyFile, publicKeyFile);
}
bool CryptoLib::loadKey(const std::string& privateKeyFile, const std::string& publicKeyFile){
  return _crypto->loadKey(privateKeyFile, publicKeyFile);
}
std::string CryptoLib::encryptText(const std::string& message){
  int length = message.length() + 1;
  byte* newMessage;
  int newLength;
  _crypto->encrypt(reinterpret_cast<const byte*>(message.data()), length, newMessage, newLength);
  //std::string newText(reinterpret_cast<char*>(newMessage));
  std::string newText=EncodeBase64(newMessage, newLength);
  delete[] newMessage;
  return newText;
}
std::string CryptoLib::decryptText(const std::string& message){
  byte* inputData;
  int length;
  DecodeBase64(message, inputData, length);
  //int length = message.length() + 1;
  byte* newMessage;
  int newLength;
  //_crypto->decrypt(reinterpret_cast<const byte*>(message.data()), length, newMessage, newLength);
  _crypto->decrypt(inputData, length, newMessage, newLength);
  std::string newText(reinterpret_cast<char*>(newMessage));
  delete[] newMessage;
  delete[] inputData;
  return newText;
}
void CryptoLib::encryptFile(const std::string& inputFile, const std::string& outputFile){
  //return _crypto->encryptFile(inputFile, outputFile);
}
void CryptoLib::decryptFile(const std::string& inputFile, const std::string& outputFile){
  //return _crypto->decryptFile(inputFile, outputFile);
}

CryptoLib::~CryptoLib(){
  if(_crypto != nullptr)
    delete (CryptoClass*)_crypto;
}