//  BWString.h
//  A simple smart string class
//  by Bill Weinman <http://bw.org/>
//  Copyright (c) 2014 The BearHeart Group LLC
//

#ifndef __BWLIB__BWString__
#define __BWLIB__BWString__

#ifdef _MSC_VER
// disable _s warnings
#define _CRT_SECURE_NO_WARNINGS
// disable pragma warnings
#pragma warning( disable : 4068 )
// standard function missing from MS library
#include <cstdarg>
int vasprintf(char ** ret, const char * format, va_list ap);
#else
#define _NOEXCEPT noexcept
#endif

#include <cstdlib>
#include <cstring>
#include <cstdarg>
#include <cctype>
#include <memory>

#define __BWString__VERSION "1.9.6"
#define __BWString__MAX_LEN 65535
#define __BWString__MAX_SPLIT 1023

// simple smart C-string
class BWString {
    char * _str = nullptr;
    size_t _str_len = 0;
    
    // this is a poor man's vector
    // shared ptr to array of shared pointer BWString objects
    typedef std::shared_ptr<BWString> _bwsp;
    typedef std::unique_ptr<_bwsp[]> _split_ptr;
    mutable _split_ptr _split_array;
    mutable size_t _split_count = 0;
    
    // private methods
    void _reset_split_array() const;
    void _append_split_array(const BWString & s) const;
    
public:
    typedef _split_ptr split_ptr;
    static const char * version() { return __BWString__VERSION; }
    BWString();                             // default constructor
    BWString( const char * s );             // c-string
    BWString( const BWString & );           // copy constructor
    BWString( BWString &&) noexcept;       // move constructor
    ~BWString();
    
    // data management
    const char * alloc_str( size_t sz );    // smart alloc string
    void reset();                           // reset data
    void swap(BWString & b);                // member function swap
    const char * c_str() const;             // getter
    const char * copy_str( const char * );  // alloc & copy
    
    // operators
    BWString & operator = ( BWString );             // copy-and-swap assignment
    BWString & operator += ( const char * );        // concatenation operator
    BWString & operator += ( const BWString & );    // concatenation operator
    const char operator[] ( const int ) const;      // subscript operator
    
    // comparison operators
    bool operator == ( const BWString & ) const;
    bool operator != ( const BWString & ) const;
    bool operator > ( const BWString & ) const;
    bool operator < ( const BWString & ) const;
    bool operator >= ( const BWString & ) const;
    bool operator <= ( const BWString & ) const;
    
    // conversion operators
    operator const char * () const;             // c-string type
    
    // utility methods
    bool have_value() const;
    size_t length() const { return _str_len; }
    size_t size() const { return _str_len; }
    BWString & format( const char * format, ... );
    BWString & trim();
    BWString lower() const;
    BWString upper() const;
    const char & back() const;
    const char & front() const;
    
    // find and replace methods
    long int char_find( const char & match ) const;
    const BWString & char_repl( const char & match, const char & repl );
    BWString substr( size_t start, size_t length );
    long find( const BWString & match ) const;
    const BWString replace( const BWString & match, const BWString & repl );
    
    // split methods
    const split_ptr & split( const char * match ) const;
    const split_ptr & split( const char match ) const;
    const split_ptr & split( const char * match, int max_split ) const;
    const BWString & split_item( size_t index ) const;
    size_t split_count() const { return _split_count; }
    
};

// non-member operator overloads
BWString operator + ( const BWString & lhs, const BWString & rhs );

#endif  // __BWLIB__BWString__
