#include <iostream>

// TODO: Ändern Sie die definierten Klassen so ab, dass Sie Aggregates Extensions nutzen können.
struct Vec2D {
    float x;
    float y;
};

struct Vec3D : Vec2D {
    float z;
};

struct Quaternion : Vec3D {
    float w;
};


int main() {

    // TODO: Verschachteln Sie dann die Intialisierer so, 
    // dass klar erkennbar ist, welcher der Klasse die Werte zugewiesen werden.
    Vec2D v2 { 4.0f, 5.0f };
    Vec3D v1 { {1.0f, 2.0f}, 3.0f };
    Quaternion q1 { {{1.0f, 0.5f}, 0.5f}, 0.2f };    

    std::cout << v2.x << ", " << v2.y << std::endl;
    std::cout << v1.x << ", " << v1.y << ", " << v1.z << std::endl;
    std::cout << q1.w << ", " << q1.x << ", " << q1.y << ", " << q1.z << std::endl;    

    return 0;
}
